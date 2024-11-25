function handler(message)
    if not message.content then
        return { error = "No content provided" }
    end

    local json = require("json")
    local content = message.content:lower()
    local predefined_keywords = {
        education = {"study", "exam", "course", "learning", "homework", "assignment", "tutor", "school", "university", "class"},
        technology = {"tech", "ai", "machine learning", "coding", "programming", "software", "blockchain", "web", "app", "network"},
        science = {"experiment", "biology", "physics", "chemistry", "laboratory", "research", "theory", "astronomy", "genetics"},
        health = {"exercise", "fitness", "diet", "yoga", "mental health", "wellness", "nutrition", "workout", "therapy"},
        business = {"investment", "finance", "economy", "startup", "entrepreneur", "marketing", "sales", "management", "budget"},
        art = {"painting", "drawing", "craft", "design", "writing", "music", "dance", "photography", "film", "poetry"},
        travel = {"adventure", "trip", "journey", "tour", "passport", "vacation", "camping", "landmark", "road trip"},
        sports = {"football", "soccer", "basketball", "cricket", "tennis", "athletics", "marathon", "olympics", "training"},
        food = {"recipe", "cooking", "baking", "cuisine", "restaurant", "meal", "snack", "dessert", "beverage"},
        environment = {"sustainability", "nature", "climate", "pollution", "wildlife", "recycle", "green", "ocean", "earth"},
        social = {"community", "event", "friendship", "network", "celebration", "culture", "volunteer", "social media"},
        history = {"ancient", "war", "civilization", "monument", "timeline", "archive", "heritage", "artifact"},
        math = {"algebra", "geometry", "calculus", "equation", "statistics", "logic", "graph", "matrix", "math"},
        personal_development = {"self-help", "motivation", "goal", "career", "leadership", "skills", "mindset", "success"}
    }

    -- Initialize tags
    local tags = {}
    local word_freq = {}

    -- Match predefined keywords
    for tag, words in pairs(predefined_keywords) do
        for _, word in ipairs(words) do
            if string.find(content, word) then
                table.insert(tags, tag)
                break
            end
        end
    end

    -- Extract additional dynamic keywords
    for word in string.gmatch(content, "%w+") do
        if #word > 3 then
            word_freq[word] = (word_freq[word] or 0) + 1
        end
    end

    -- Sort by frequency and append the top 5 frequent keywords as tags
    local sorted_words = {}
    for word, count in pairs(word_freq) do
        table.insert(sorted_words, { word = word, count = count })
    end
    table.sort(sorted_words, function(a, b) return a.count > b.count end)

    for i = 1, math.min(5, #sorted_words) do
        table.insert(tags, sorted_words[i].word)
    end

    return { content = message.content, tags = tags }
end
