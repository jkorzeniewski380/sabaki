import { Flex, Text } from "@chakra-ui/react";
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
            return <Text color="teal.600">{person[word]}</Text>;
        }
        return <Text>{word}</Text>;
    });
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
        <Flex
            w="100%"
            flexWrap="wrap"
            fontSize="48"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            {substitutePlaceholders(text, picked)}
        </Flex>
    );
};
