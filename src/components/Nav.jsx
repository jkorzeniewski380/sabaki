import { Button, Flex } from "@chakra-ui/react"
import { RepeatClockIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { QUESTIONS } from "../data/questions";

export const Nav = ({ current, onReroll, onNext, onPrevious }) => {
    return (
        <Flex
            direction="column"
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            my={3}
            gap={3}
        >
            <Flex
                w="100%"
                alignItems="center"
                justifyContent="flex-end"
            >
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={onReroll}
                >
                    <RepeatClockIcon boxSize={9} />
                </Button>
            </Flex>
            <Flex
                w="100%"
                alignItems="center"
                justifyContent="flex-end"
                gap={4}
            >
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={onPrevious}
                    isDisabled={current === 0}
                >
                    <ArrowBackIcon boxSize={9} />
                </Button>
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={onNext}
                    isDisabled={current === QUESTIONS.length - 1}
                >
                    <ArrowForwardIcon boxSize={9} />
                </Button>
            </Flex>
        </Flex>
    );
};
