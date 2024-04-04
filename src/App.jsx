import { useState, useCallback } from 'react';
import { ChakraProvider, Flex, Spacer, Text } from '@chakra-ui/react';
import { take, update, compose, without, nth, keys } from "ramda";
import './App.css';
import { shuffle } from './utils';
import { Page } from './components/Page';
import { Nav } from './components/Nav';
import { PEOPLE } from './data/names';
import { QUESTIONS } from './data/questions';
import { useTimer } from './hooks/useTimer';
import { useOrders } from './hooks/useOrders';
import { Question } from "./components/Question";
import { Answering } from "./components/Answering";

const INITIAL_SECONDS = 20;

const rerollAnswering = (current) => {
  const getKeysWithoutCurrent = compose(without([current]), keys);
  const getRandomKey = (keysArray) => {
    const randomIndex = Math.floor(Math.random() * keysArray.length);
    return nth(randomIndex, keysArray);
  };

  const others = getKeysWithoutCurrent(PEOPLE);
  return getRandomKey(others);
};

function App() {
  const [current, setCurrent] = useState(0);

  const {
    people,
    questions,
    setQuestions,
    setPeople,
  } = useOrders();

  const rerollPeople = useCallback((questionNumber) => {
    setQuestions((currentQuestions) => {
      const questionData = currentQuestions[questionNumber];
      const groupSize = questionData.people.length;
      const peopleKeys = Object.keys(PEOPLE);
      const newQuestionData = {
        ...questionData,
        picked: take(groupSize, shuffle(peopleKeys))
      };

      return update(questionNumber, newQuestionData, currentQuestions);
    });
    setPeople((currentPeople) => {
      const newAnswering = rerollAnswering(currentPeople[questionNumber]);
      return update(questionNumber, newAnswering, currentPeople);
    });
  }, [setQuestions, setPeople]);

  const onFinish = useCallback(() => {
    console.log("finish");
  }, []);

  const [time, setTime] = useTimer(INITIAL_SECONDS, onFinish);

  const resetTime = useCallback(() => {
    setTime(INITIAL_SECONDS);
  }, []);

  const onPrevious = useCallback(() => {
    setCurrent((cur) => {
      if (cur <= 0) {
        return 0;
      }
      resetTime();
      return cur - 1;
    });
  }, [resetTime]);

  const onNext = useCallback(() => {
    setCurrent((cur) => {
      if (cur >= QUESTIONS.length - 1) {
        return QUESTIONS.length - 1;
      }
      if (cur + 1 < QUESTIONS.length - 1) {
        resetTime();
      }
      return cur + 1;
    });
  }, [resetTime]);

  const onReroll = useCallback(() => {
    rerollPeople(current);
    resetTime();
  }, [current, resetTime]);

  const isLast = current === QUESTIONS.length - 1;
  return (
    <ChakraProvider>
      <Page>
        <Flex
          w="100%"
          justifyContent="center"
          fontWeight="bold"
        >
          <Text fontSize="32" color={time > 0 ? "lightgreen" : "red"}>
            {time > 0 ? `Zostało ${time}s...` : "Koniec czasu!"}
          </Text>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          {isLast ? (
            <Text fontSize="48">
              Koniec, czas chlać pajace
            </Text>
          ) : (
            <>
              <Spacer />
              <Question
                questions={questions}
                questionNumber={current}
              />
              <Spacer />
              <Answering
                peopleOrder={people}
                questionNumber={current}
              />
            </>
          )}
        </Flex>
        <Nav
          current={current}
          onReroll={onReroll}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Page>
    </ChakraProvider >
  )
}

export default App;
