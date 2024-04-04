import { Text } from "@chakra-ui/react";
import { includes } from "ramda";
import { NAME_OPTIONS, PEOPLE } from "../data/names";

const substitutePlaceholders = (text, picked) => {
    const pickedPeople = picked.map((idx) => PEOPLE[idx]);
    const words = text.split(/(\s|\.\s|,\s)/g);
    let personIdx = 0;
    return words.map((word) => {
        if (includes(word, NAME_OPTIONS)) {
            console.log(word, pickedPeople, personIdx);
            const person = pickedPeople[personIdx];
            personIdx += 1;
            return person[word];
        }
        return word;
    }).join("");
};

export const Question = ({
    questions, questionNumber
}) => {
    if (questions.length <= questionNumber) {
        return null;
    }
    const {
        text,
        picked,
    } = questions[questionNumber];

    return (
        <Text fontSize="32">
            {substitutePlaceholders(text, picked)}
        </Text>
    );
};
