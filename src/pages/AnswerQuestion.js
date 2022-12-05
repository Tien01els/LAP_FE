import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'mathlive';
import moment from 'moment';

import { API_URL } from '../constant';
import Button from '../components/Button';
// import MultiChoice from '../components/Teacher/AnswerType/MultiChoice';
// import TrueFalse from '../components/Teacher/AnswerType/TrueFalse';
import MultiChoiceAnswer from '../components/Student/MultiChoiceAnswer';
import TrueFalseAnswer from '../components/Student/TrueFalseAnswer';
import MultiSelectAnswers from '../components/Student/MultiSelectAnswers';
import InputAnswer from '../components/Teacher/AnswerType/InputAnswer';
import TokenExpire from '../components/Modals/TokenExpire';
import ConfirmModal from '../components/Modals/ConfirmModal';

import createAxiosJWT from '../createAxiosJWT';

const axiosJWT = createAxiosJWT();
const AnswerQuestion = ({ isTeacher }) => {
    const navigate = useNavigate();
    const { assignmentId, questionIndex } = useParams();
    //   const [countdown, setCountdown] = useState()
    const [isExpired, setIsExpired] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [currentQuestionId, setCurrentQuestionId] = useState();
    const [listQuestionOfAssignment, setListQuestionOfAssignment] = useState([]);
    const [answers, setAnswers] = useState();
    const [timeDown, setTimeDown] = useState();
    const [doTime, setDoTime] = useState('00:00:00');
    const [isSubmit, setIsSubmit] = useState(true);

    // const convertMinutes = (minutesDo) => {
    //     const h = (minutesDo / 3600) | 0,
    //         m = (minutesDo / 60) | 0,
    //         s = minutesDo % 60 | 0;
    //     return moment.utc().hours(h).minutes(m).seconds(s).format('HH : mm : ss');
    // };

    // const formatCountDown = (duration) => {
    //     const hours =
    //         duration.hours() && duration.hours() > 9
    //             ? `${duration.hours()}:`
    //             : `0${duration.hours()}:` || '';
    //     const minutes =
    //         duration.minutes() && duration.minutes() > 9
    //             ? `${duration.minutes()}:`
    //             : `0${duration.minutes()}:` || '';
    //     const seconds =
    //         duration.seconds() && duration.seconds() > 9
    //             ? `${duration.seconds()}`
    //             : `0${duration.seconds()}` || '';
    //     return hours + minutes + seconds;
    // };

    const checkAnswered = (questionOfAssignment) => {
        const questionType = ['', 'multiChoice', 'trueFalse', 'input', 'multiSelect'];
        const answerOfRespondent = questionOfAssignment?.answerOfRespondent?.answer;
        const typeOfquestion =
            questionOfAssignment?.questionTypeId &&
            questionType[questionOfAssignment?.questionTypeId];
        if (answerOfRespondent && typeOfquestion && answerOfRespondent[typeOfquestion]) {
            const resultOfUser = answerOfRespondent[typeOfquestion];
            if (typeOfquestion === 'multiChoice')
                for (let i = 0; i < resultOfUser.length; i++)
                    if (resultOfUser[i].isTrue) return true;
            if (typeOfquestion === 'trueFalse')
                for (let i = 0; i < resultOfUser.length; i++)
                    if (resultOfUser[i].isTrue) return true;
            if (typeOfquestion === 'input' && resultOfUser[0].answer.length > 0) return true;
            if (typeOfquestion === 'multiSelect')
                for (let i = 0; i < resultOfUser.length; i++)
                    if (resultOfUser[i].isTrue) return true;
        }
        return false;
    };

    const handleSaveAnswer = async () => {
        try {
            if (isTeacher)
                await axiosJWT.put(
                    API_URL +
                        `teacher-question/${currentQuestion?.answerOfRespondent?.respondentQuestionId}`,
                    {
                        answer: answers,
                    }
                );
            else
                await axiosJWT.put(
                    API_URL +
                        `student-question/${currentQuestion?.answerOfRespondent?.respondentQuestionId}`,
                    {
                        answer: answers,
                    }
                );
            if (currentQuestion?.index < listQuestionOfAssignment.length - 1)
                handleQuestionOfAssignment(currentQuestion?.index + 1);
            else {
                handleQuestionOfAssignment(currentQuestion?.index);
                setIsConfirm(true);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleQuestionOfAssignment = useCallback(
        async (index) => {
            try {
                const questionIdx = index || 0;
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
                    const questionsOfAssignment = res.data;
                    for (let i = 0; i < questionsOfAssignment.length; i++)
                        questionsOfAssignment[i].index = i;
                    if (questionsOfAssignment && questionsOfAssignment.length > 0) {
                        setListQuestionOfAssignment(questionsOfAssignment);
                        setCurrentQuestionId(questionsOfAssignment[questionIdx]?.id);
                    }
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) setIsExpired(true);
            }
        },
        [assignmentId, isTeacher]
    );

    const handleSubmitAssignment = async () => {
        try {
            if (isTeacher)
                await axiosJWT.put(
                    API_URL +
                        `teacher-question/${currentQuestion?.answerOfRespondent?.respondentQuestionId}`,
                    {
                        answer: answers,
                    }
                );
            else
                await axiosJWT.put(
                    API_URL +
                        `student-question/${currentQuestion?.answerOfRespondent?.respondentQuestionId}`,
                    {
                        answer: answers,
                    }
                );

            handleQuestionOfAssignment(currentQuestion?.index);
            setIsConfirm(true);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    };

    const handleConfirmSubmitAssignmet = useCallback(async () => {
        try {
            if (isTeacher)
                !isSubmit &&
                    (await axiosJWT.put(
                        API_URL + `teacher-assignment/teacher/assignment/${assignmentId}/submit`
                    ));
            else
                !isSubmit &&
                    (await axiosJWT.put(
                        API_URL + `student-assignment/student/assignment/${assignmentId}/submit`
                    ));
            navigate(`/assignment/${assignmentId}/result`);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) setIsExpired(true);
        }
    }, [assignmentId, navigate, isSubmit, isTeacher]);

    useEffect(() => {
        if (timeDown && timeDown < 0) {
            setDoTime('00:00:00');
            handleConfirmSubmitAssignmet();
        }
    }, [timeDown, handleConfirmSubmitAssignmet]);

    useEffect(() => {
        handleQuestionOfAssignment();
    }, [handleQuestionOfAssignment]);

    useEffect(() => {
        const countDownTime = async () => {
            let res;
            if (isTeacher)
                res = await axiosJWT.get(
                    API_URL + `teacher-assignment/teacher/assignment/${assignmentId}/do-time`
                );
            else
                res = await axiosJWT.get(
                    API_URL + `student-assignment/student/assignment/${assignmentId}/do-time`
                );
            if (res) {
                const assignmentTime = res.data;
                setIsSubmit(!!assignmentTime?.dateComplete);
                if (!!assignmentTime?.dateComplete) {
                    navigate(`/assignment/${assignmentId}/result`);
                    return;
                }
                const currentTimerId = setInterval(() => {
                    const dateEnd = moment(assignmentTime?.dateEnd).diff(moment());
                    const diff = moment(dateEnd).utcOffset(0).format('HH:mm:ss');
                    setTimeDown(dateEnd);
                    setDoTime(diff);
                    // console.log(dateEnd)
                    // console.log(diff)
                }, 1000);
                return () => {
                    clearInterval(currentTimerId);
                };
            }
        };
        const clearTimer = countDownTime();
        return () => clearTimer.then((clearTimerId) => clearTimerId && clearTimerId());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assignmentId]);

    useEffect(() => {
        setCurrentQuestion(
            listQuestionOfAssignment.find(
                (questionOfAssignment) => questionOfAssignment.id === currentQuestionId
            )
        );
    }, [currentQuestionId, listQuestionOfAssignment]);

    useEffect(() => {
        if (currentQuestion) {
            const answerOfRespondent = {
                multiChoice: currentQuestion.answerOfRespondent?.answer?.multiChoice?.map(
                    (multiChoice, i) => ({
                        isTrue: multiChoice?.isTrue,
                        answer: currentQuestion.contentQuestion?.multiChoice[i]?.answer,
                    })
                ),
                multiSelect: currentQuestion.answerOfRespondent?.answer?.multiSelect?.map(
                    (multiSelect, i) => ({
                        isTrue: multiSelect?.isTrue,
                        answer: currentQuestion.contentQuestion?.multiSelect[i]?.answer,
                    })
                ),
                input: currentQuestion.answerOfRespondent?.answer?.input,
                trueFalse: currentQuestion.answerOfRespondent?.answer?.trueFalse?.map(
                    (trueFalse, i) => ({
                        isTrue: trueFalse?.isTrue,
                        answer: currentQuestion.contentQuestion?.trueFalse[i]?.answer,
                    })
                ),
            };

            const newAnswer = {
                multiChoice: currentQuestion.contentQuestion?.multiChoice?.map((multiChoice) => ({
                    isTrue: false,
                    answer: multiChoice.answer,
                })),
                multiSelect: currentQuestion.contentQuestion?.multiSelect?.map((multiSelect) => ({
                    isTrue: false,
                    answer: multiSelect.answer,
                })),
                input: [{ answer: '' }],
                trueFalse: currentQuestion.contentQuestion?.trueFalse?.map((trueFalse) => ({
                    isTrue: false,
                    answer: trueFalse.answer,
                })),
            };
            setAnswers(currentQuestion.answerOfRespondent?.answer ? answerOfRespondent : newAnswer);
        }
    }, [currentQuestion, isTeacher]);

    // useEffect(() => {
    //     listQuestionOfAssignment &&
    //         setCurrentQuestionId(listQuestionOfAssignment[questionIndex - 1]?.id);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [questionIndex, listQuestionOfAssignment]);

    const renderAnswer = (questionTypeId) => {
        switch (questionTypeId) {
            case 1:
                return answers && <MultiChoiceAnswer answers={answers} setAnswers={setAnswers} />;
            // contentQuestion.multiChoice = contentQuestion?.multiChoice.map((multiChoice) => ({
            //     isTrue: false,
            //     answer: multiChoice.answer,
            // }));
            case 2:
                return answers && <TrueFalseAnswer answers={answers} setAnswers={setAnswers} />;
            // contentQuestion.trueFalse = contentQuestion?.trueFalse.map((trueFalse) => ({
            //     isTrue: false,
            //     answer: trueFalse.answer,
            // }));
            case 3:
                return answers && <InputAnswer answers={answers} setAnswers={setAnswers} />;
            // <textarea
            //     placeholder='Enter the answer...'
            //     className='outline-primary resize-none transition-all border-2 border-gray-500 px-5 py-2 rounded-md w-[100%]'
            // ></textarea>
            case 4:
                return answers && <MultiSelectAnswers answers={answers} setAnswers={setAnswers} />;
            default:
                return <div>404</div>;
        }
    };

    useEffect(() => {
        const mf = document.querySelector('#formula');
        mf.setValue(
            String.raw`\begin{multline}
    ` +
                currentQuestion?.content +
                String.raw`
    \end{multline}`
        );
    }, [currentQuestion?.content]);

    return (
        <div className='flex flex-col px-10 gap-5 py-7'>
            <h2 className='font-semibold font-inter px-3 text-xl'>Assignment name</h2>
            <div className='flex flex-row gap-5 h-fit w-full'>
                {/* right */}
                <div className='flex flex-col w-[65%] gap-5'>
                    <div className='w-full bg-white shadow rounded-lg px-12 pt-7 pb-5 flex flex-col gap-5 text-justify'>
                        <div className='flex'>
                            <h2 className='font-semibold font-inter text-primary rounded-lg text-xl'>
                                Question - {currentQuestion?.index + 1}
                            </h2>
                        </div>
                        {/* problem */}
                        <math-field
                            id='formula'
                            style={{
                                whiteSpace: 'initial',
                                fontSize: '20px',
                                outline: 'none',
                                padding: '0.5rem 1.5rem',
                                userSelect: 'none',
                                width: '100%',
                                maxHeight: '150px',
                                overflowWrap: 'break-word',
                                fontFamily: 'Poppins',
                            }}
                            readonly
                        ></math-field>
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
                            <span className='font-semibold text-2xl text-primary'>{doTime}</span>
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
                                            {checkAnswered(questionOfAssignment) && (
                                                <div className='text-white flex w-full h-full items-center justify-center bg-primary'></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Button className='border-none w-[70%]' onClick={handleSubmitAssignment}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <TokenExpire isOpen={isExpired} />
            <ConfirmModal
                isOpen={isConfirm}
                message='Do you want submit assignment?'
                yesConfirm={handleConfirmSubmitAssignmet}
                noConfirm={() => setIsConfirm(false)}
            />
        </div>
    );
};

export default AnswerQuestion;
