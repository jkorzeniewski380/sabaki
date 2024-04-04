import { range, sort, pipe, keys, chain, repeat, take, map } from "ramda";
import { PEOPLE } from "../data/names";
import { QUESTIONS } from "../data/questions";

export const generateQuestionOrder = () => sort(
    () => Math.random() - 0.5,
    range(0, QUESTIONS.length)
);

export const random = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

export const shuffle = (stringList) => {
    const indices = range(0, stringList.length);
    const shuffledIndices = sort(() => Math.random() - 0.5, indices);
    return map(i => stringList[i], shuffledIndices);
}

export const generatePeopleOrderByCount = (peopleCount) => {
    const questionsCount = QUESTIONS.length;
    const times = Math.floor(questionsCount / peopleCount);
    const remainder = questionsCount % peopleCount;

    const repeated = pipe(
        keys,
        chain((key) => repeat(key, times))
    )(PEOPLE);

    const unsorted = [...take(remainder, Object.keys(PEOPLE)), ...repeated];

    return sort(
        () => Math.random() - 0.5,
        unsorted
    );
}

export const generatePeopleOrder = () => {
    const peopleCount = Object.keys(PEOPLE).length;

    return generatePeopleOrderByCount(peopleCount);
};
