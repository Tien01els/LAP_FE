import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { API_URL } from '../constant';
import Button from '../components/Button';
import CustomCheckbox from '../components/CustomeCheckbox';
import MultiChoice from '../components/Teacher/AnswerType/MultiChoice';
import TrueFalse from '../components/Teacher/AnswerType/TrueFalse';
import InputAnswer from '../components/Teacher/AnswerType/InputAnswer';
import createAxiosJWT from '../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const AnswerQuestion = () => {
    //   const [countdown, setCountdown] = useState()
    const [currentQuestion, setCurrentQuestion] = useState();
    const [currentQuestionId, setCurrentQuestionId] = useState();
    const [listQuestionOfAssignment, setListQuestionOfAssignment] = useState([]);
    const [answer, setAnswer] = useState({
        multiChoice: [
            { isTrue: false, answer: '' },
            { isTrue: false, answer: '' },
            { isTrue: false, answer: '' },
            { isTrue: false, answer: '' },
        ],
        multiSelect: [],
        input: [],
        trueFalse: [],
    });

    const { assignmentId } = useParams();

    const handleSaveAnswer = async () => {
        console.log(currentQuestionId);
        await axiosJWT.put(
            API_URL + `student-question/${currentQuestion?.answerOfStudent.studentQuestionId}`,
            {
                answer,
            }
        );
        if (currentQuestion?.index < listQuestionOfAssignment.length - 1)
            handleQuestionOfAssignmentForStudent(currentQuestion?.index + 1);
    };

    const handleQuestionOfAssignmentForStudent = useCallback(
        async (index) => {
            const questionIndex = index || 0;
            const res = await axiosJWT.get(API_URL + `student-question/assignment/${assignmentId}`);
            const questionsOfAssignment = res.data;
            for (let i = 0; i < questionsOfAssignment.length; i++)
                questionsOfAssignment[i].index = i;

            if (questionsOfAssignment && questionsOfAssignment.length > 0) {
                setListQuestionOfAssignment(questionsOfAssignment);
                setCurrentQuestionId(questionsOfAssignment[questionIndex]?.id);
            }
        },
        [assignmentId]
    );

    useEffect(() => {
        handleQuestionOfAssignmentForStudent();
    }, [handleQuestionOfAssignmentForStudent]);

    useEffect(() => {
        setCurrentQuestion(
            listQuestionOfAssignment.find(
                (questionOfAssignment) => questionOfAssignment.id === currentQuestionId
            )
        );
    }, [currentQuestionId, listQuestionOfAssignment]);

    useEffect(() => {
        if (currentQuestion)
            setAnswer(
                currentQuestion?.answerOfStudent?.answer
                    ? currentQuestion?.answerOfStudent?.answer
                    : {
                          multiChoice: currentQuestion?.contentQuestion.multiChoice.map(
                              (multiChoice) => ({
                                  isTrue: false,
                                  answer: multiChoice.answer,
                              })
                          ),
                          multiSelect: [],
                          input: [],
                          trueFalse: currentQuestion?.contentQuestion.trueFalse?.map(
                              (trueFalse) => ({
                                  isTrue: false,
                                  answer: trueFalse.answer,
                              })
                          ),
                      }
            );
    }, [currentQuestion]);
    const renderAnswer = (questionTypeId) => {
        switch (questionTypeId) {
            case 1:
                // contentQuestion.multiChoice = contentQuestion?.multiChoice.map((multiChoice) => ({
                //     isTrue: false,
                //     answer: multiChoice.answer,
                // }));
                return (
                    <MultiChoice
                        key={currentQuestion}
                        answers={answer}
                        setAnswers={setAnswer}
                        Preview
                    />
                );
            case 2:
                // contentQuestion.trueFalse = contentQuestion?.trueFalse.map((trueFalse) => ({
                //     isTrue: false,
                //     answer: trueFalse.answer,
                // }));
                return <TrueFalse answers={answer} setAnswers={setAnswer} />;
            case 3:
                return (
                    <textarea
                        placeholder='Enter the answer...'
                        className='outline-primary resize-none transition-all border-2 border-gray-500 px-5 py-2 rounded-md w-[100%]'
                    ></textarea>
                );
            case 4:
                return (
                    <div className='flex flex-col items-center gap-5'>
                        {answer?.multiChoice?.map((item, i) => {
                            return (
                                <CustomCheckbox key={item.isTrue + item.answer + i} item={item} />
                            );
                        })}
                    </div>
                );
            default:
                return <div>404</div>;
        }
    };

    return (
        <div className='flex flex-col px-10 gap-5 py-7'>
            <h2 className='font-semibold font-inter px-3 text-xl'>Assignment name</h2>
            <div className='flex flex-row gap-5 h-[full] w-full'>
                {/* right */}
                <div className='flex flex-col w-[65%] gap-5'>
                    <div className='w-full bg-white shadow rounded-lg px-12 pt-7 pb-5 flex flex-col gap-5 text-justify'>
                        <div className='flex'>
                            <h2 className='font-semibold font-inter text-primary rounded-lg text-xl'>
                                Question - {currentQuestion?.index + 1}
                            </h2>
                        </div>
                        {/* problem */}
                        <span>{currentQuestion?.content}</span>
                        {/* answer */}
                        <div className=''>{renderAnswer(currentQuestion?.questionTypeId)}</div>
                        {/* Next */}
                        <div className='flex flex-row-reverse'>
                            <Button className='border-none' onClick={handleSaveAnswer}>
                                {currentQuestion?.index === listQuestionOfAssignment.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* left */}
                <div className='flex flex-col gap-5 w-[35%]'>
                    <div className='flex flex-col h-[450px] pt-7 px-5 pb-5 items-center bg-white justify-between rounded-lg shadow'>
                        <div className='flex flex-col items-center gap-3 h-full '>
                            <span className='font-semibold text-2xl text-primary'>01 : 10</span>
                            <div className='flex flex-wrap gap-5 max-h-[300px] px-5 overflow-y-auto py-3'>
                                {listQuestionOfAssignment.map((questionOfAssignment, i) => {
                                    return (
                                        <div
                                            key={questionOfAssignment.id}
                                            className='h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-500 hover:outline-green-500 rounded overflow-hidden transition-all cursor-pointer select-none'
                                            onClick={() =>
                                                setCurrentQuestionId(questionOfAssignment.id)
                                            }
                                        >
                                            <div className='flex justify-center items-center'>
                                                <span>{i + 1}</span>
                                            </div>
                                            <div className='text-white flex w-full h-full items-center justify-center bg-green-500'>
                                                <i className='fas fa-check text-[8px]'></i>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Button className='border-none w-[70%]'>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerQuestion;
