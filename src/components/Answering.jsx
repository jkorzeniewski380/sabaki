import { Flex } from "@chakra-ui/react";
import { PEOPLE } from "../data/names"

export const Answering = ({
    questionNumber,
    peopleOrder
}) => {
    if (peopleOrder.length <= questionNumber) {
        return null;
    }
    const personData = PEOPLE[peopleOrder[questionNumber]];

    return (
        <Flex
            w="100%"
            align="center"
            justify="center"
            fontSize="32"
        >
            Odpowiada: {personData.nick}
        </Flex>
    );
};
