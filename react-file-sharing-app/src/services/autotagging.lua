function handle(tx)
    local json = require("json")
    local data = json.decode(tx.data)

    local title = data.title or ""
    local content = data.content or ""
    local attachment = data.attachment

    -- Extract keywords from title and content
    local keywords = {}
    for word in string.gmatch(title .. " " .. content, "%w+") do
        word = string.lower(word)
        if string.len(word) > 3 then
            keywords[word] = (keywords[word] or 0) + 1
        end
    end

    -- Add file-based keywords if attachment exists
    if attachment and attachment.fileName then
        local fileKeywords = {}
        for word in string.gmatch(attachment.fileName, "%w+") do
            word = string.lower(word)
            if string.len(word) > 3 then
                fileKeywords[word] = true
            end
        end
        for word in pairs(fileKeywords) do
            keywords[word] = (keywords[word] or 0) + 1
        end
    end

    -- Sort keywords by frequency and return the top tags
    local sortedTags = {}
    for word, count in pairs(keywords) do
        table.insert(sortedTags, { word = word, count = count })
    end
    table.sort(sortedTags, function(a, b) return a.count > b.count end)

    local tags = {}
    for i = 1, math.min(5, #sortedTags) do
        table.insert(tags, sortedTags[i].word)
    end

    return tags
end
