import { useEffect, useState } from "react"
import {
    flatten,
    repeat,
    filter,
    includes,
    clone,
    remove,
} from "ramda";
import { NAME_OPTIONS, PEOPLE } from "../data/names";
import { generatePeopleOrder, generateQuestionOrder, random } from "../utils";
import { QUESTIONS } from "../data/questions";

const parseQuestion = (questionText) => ({
    text: questionText,
    people: filter(
        (word) => includes(word, NAME_OPTIONS),
        questionText.split(/(\s|\.\s|,\s)/g)
    )
});

const generateGroups = (A, P, Q, R, S) => {
    const people = Object.keys(PEOPLE);
    const groupSizes = flatten([repeat(0, A), repeat(1, P), repeat(2, Q), repeat(3, R), repeat(4, S)]);
    const groups = {};

    for (let size of groupSizes) {
        let pool = clone(people);
        let group = [];
        while (group.length < size) {
            let randomIndex = random(0, pool.length - 1);
            group.push(pool[randomIndex]);
            pool = remove(randomIndex, 1, pool);
        }

        if (!groups[size]) {
            groups[size] = [];
        }
        groups[size].push(group);
    }

    return groups;
};

const generateGroupsFromParsedQuestions = (parsedQuestions) => {
    const counts = [0, 0, 0, 0, 0];
    parsedQuestions.forEach(({ people }) => {
        counts[people.length]++;
    });
    console.log(counts);
    const [A, P, Q, R, S] = counts;
    return generateGroups(A, P, Q, R, S);
}

export const useOrders = () => {
    const [people, setPeople] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const questionOrder = generateQuestionOrder();
        const peopleOrder = generatePeopleOrder();

        const parsedQuestions = questionOrder.map(
            (questionNumber) => parseQuestion(QUESTIONS[questionNumber])
        );
        const groups = generateGroupsFromParsedQuestions(parsedQuestions);
        const questionsWithPeople = parsedQuestions.map((parsed) => {
            const size = parsed.people.length;
            const result = {
                ...parsed,
                picked: groups[size][0]
            };
            groups[size] = remove(0, 1, groups[size]);
            return result;
        });

        setPeople(peopleOrder);
        setQuestions(questionsWithPeople);
    }, []);

    return {
        people,
        questions,
        setQuestions,
        setPeople,
    };
};