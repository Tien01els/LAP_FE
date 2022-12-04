import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { API_URL } from '../constant';
import createAxiosJWT from '../createAxiosJWT';
import Result from '../components/Student/Result';

const axiosJWT = createAxiosJWT();
const AssignmentResult = ({ isTeacher }) => {
    const { assignmentId } = useParams();
    const [listQuestionOfRespondent, setListQuestionOfRespondent] = useState([]);
    const [listQuestionOfAssignment, setListQuestionOfAssignment] = useState([]);
    const [assignment, setAssignment] = useState({});
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);

    const executeScroll = (id) => {
        let elementId = `question-${id}`;
        document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
    };

    const checkAnswered = (questionOfAssignment) => {
        const questionType = ['', 'multiChoice', 'trueFalse', 'input', 'multiSelect'];
        const answerOfRespondent = questionOfAssignment?.answerOfRespondent?.answer;
        const typeOfquestion =
            questionOfAssignment?.questionTypeId &&
            questionType[questionOfAssignment?.questionTypeId];
        if (answerOfRespondent && typeOfquestion && answerOfRespondent[typeOfquestion]) {
            const resultOfRespondent = answerOfRespondent[typeOfquestion];
            if (typeOfquestion === 'multiChoice')
                for (let i = 0; i < resultOfRespondent.length; i++)
                    if (resultOfRespondent[i].isTrue) return resultOfRespondent[i].answer;
            if (typeOfquestion === 'trueFalse')
                for (let i = 0; i < resultOfRespondent.length; i++)
                    if (resultOfRespondent[i].isTrue) return resultOfRespondent[i].answer;
            if (typeOfquestion === 'input' && resultOfRespondent[0].answer.length > 0)
                return resultOfRespondent[0].answer;
            if (typeOfquestion === 'multiSelect')
                for (let i = 0; i < resultOfRespondent.length; i++)
                    if (resultOfRespondent[i].isTrue) return resultOfRespondent[i].answer;
        }
        return false;
    };

    const getCorrectAnswerOfQuestion = (questionOfAssignment) => {
        const questionType = ['', 'multiChoice', 'trueFalse', 'input', 'multiSelect'];
        const answerOfQuestion = questionOfAssignment?.option;
        const typeOfquestion =
            questionOfAssignment?.questionTypeId &&
            questionType[questionOfAssignment?.questionTypeId];
        if (answerOfQuestion && typeOfquestion && answerOfQuestion[typeOfquestion]) {
            const resultOfQuestion = answerOfQuestion[typeOfquestion];
            if (typeOfquestion === 'multiChoice')
                for (let i = 0; i < resultOfQuestion.length; i++)
                    if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer;
            if (typeOfquestion === 'trueFalse')
                for (let i = 0; i < resultOfQuestion.length; i++)
                    if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer;
            if (typeOfquestion === 'input' && resultOfQuestion[0].answer.length > 0)
                return resultOfQuestion[0].answer;
            if (typeOfquestion === 'multiSelect')
                for (let i = 0; i < resultOfQuestion.length; i++)
                    if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer;
        }
        return false;
    };

    useEffect(() => {
        const getResultFromAnswer = async () => {
            let res;
            if (isTeacher)
                res = await axiosJWT.get(
                    API_URL + `teacher-question/teacher/assignment/${assignmentId}`
                );
            else
                res = await axiosJWT.get(
                    API_URL + `student-question/student/assignment/${assignmentId}`
                );
            if (res) {
                const questionsOfRespondent = res.data;
                for (let i = 0; i < questionsOfRespondent.length; i++)
                    questionsOfRespondent[i].index = i;
                if (questionsOfRespondent && questionsOfRespondent.length > 0) {
                    setListQuestionOfRespondent(questionsOfRespondent);
                    let countCorrect = 0;
                    let sumScore = 0;
                    for (let i = 0; i < questionsOfRespondent.length; i++)
                        if (questionsOfRespondent[i]?.answerOfRespondent?.isCorrect) {
                            ++countCorrect;
                            sumScore += questionsOfRespondent[i].score;
                        }
                    console.log(questionsOfRespondent);
                    setNumberOfCorrectAnswers(countCorrect);
                    setScore(sumScore);
                }
            }
        };
        getResultFromAnswer();
        if (isTeacher)
            axiosJWT
                .get(API_URL + `teacher-assignment/teacher/assignment/${assignmentId}`)
                .then((res) => {
                    console.log(res.data);
                });
        else
            axiosJWT
                .get(API_URL + `student-assignment/student/assignment/${assignmentId}`)
                .then((res) => {
                    console.log(res.data);
                });
        axiosJWT.get(API_URL + `assignment/${assignmentId}`).then((res) => {
            setAssignment(res.data);
        });
        axiosJWT.get(API_URL + `assignment-question/assignment/${assignmentId}`).then((res) => {
            setListQuestionOfAssignment(res.data);
        });
    }, [assignmentId]);

    return (
        <div className='px-10 py-7 flex flex-row'>
            {/* left */}
            <div className=' bg-white  w-[40%] h-fit px-5 py-4 shadow rounded-lg'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-3'>
                        <span className='text-2xl font-[500] text-primary'>
                            {assignment.assignmentName}
                        </span>
                        <span className='text-gray-500 text-sm'>
                            <i className='fa-regular fa-clock'></i> {assignment.time} mins -{' '}
                            <i className='fa-regular fa-calendar'></i>{' '}
                            {moment(assignment.dateDue).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                        <span>Correct answers: {numberOfCorrectAnswers}</span>
                        <span className='font-base'>Score: {score}</span>
                    </div>
                    {/* answers */}
                    <div className='flex flex-col gap-3'>
                        <span className='text-xl font-base'>Your answers</span>
                        <div className='flex flex-wrap gap-5 px-2 py-3 rounded-xl items-center'>
                            {listQuestionOfRespondent.map((questionOfRespondent, i) => {
                                return (
                                    <div
                                        onClick={() => executeScroll(i)}
                                        key={i}
                                        className='h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-200 hover:outline-red-400 rounded overflow-hidden transition-all cursor-pointer select-none'
                                    >
                                        <div className='flex justify-center items-center'>
                                            <span>{i + 1}</span>
                                        </div>

                                        {questionOfRespondent?.answerOfRespondent?.isCorrect ? (
                                            <div className='text-white flex w-full h-full items-center justify-center bg-green-400'>
                                                <i className='fas fa-check text-[8px]'></i>
                                            </div>
                                        ) : (
                                            <div className='text-white flex w-full h-full items-center justify-center bg-red-400'>
                                                <i className='fa solid fa-xmark text-[8px]'></i>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className='px-10 gap-5 h-[90vh] w-[60%] overflow-y-auto  items-center justify-center'>
                <div className='flex flex-col gap-5 pb-5 '>
                    {listQuestionOfRespondent.map((questionOfRespondent, i) => {
                        return (
                            <Result
                                questionOfRespondent={questionOfRespondent}
                                index={i}
                                key={i}
                                getCorrectAnswerOfQuestion={getCorrectAnswerOfQuestion}
                                listQuestionOfAssignment={listQuestionOfAssignment}
                                checkAnswered={checkAnswered}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AssignmentResult;