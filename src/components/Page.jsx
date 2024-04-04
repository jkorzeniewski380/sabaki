import { Flex } from "@chakra-ui/react";

export const Page = ({ children }) => (
    <Flex
        direction="column"
        w="100%"
        h="100%"
        justifyContent="center"
        my={4}
    >
        {children}
    </Flex>
);
