import React, { useState, useEffect, useMemo } from 'react';

const MultiChoice = ({ answers, setAnswers, Preview }) => {
    const [value, setValue] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    const convert = useMemo(
        () => ({
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd',
        }),
        []
    );

    useEffect(() => {
        if (
            answers &&
            answers.length === 4 &&
            answers.filter((item) => item.isTrue).length === 1
        ) {
            console.log(answers);
            const trueAnswer = answers.findIndex(
                (element) => element.isTrue === true
            );
            setValue(convert[`${trueAnswer}`]);
            setAnswerA(answers[0]?.answer);
            setAnswerB(answers[1]?.answer);
            setAnswerC(answers[2]?.answer);
            setAnswerD(answers[3]?.answer);
        }
        if (answers.length === 0) {
            setValue('');
            setAnswerA('');
            setAnswerB('');
            setAnswerC('');
            setAnswerD('');
        }
    }, [answers, convert]);

    useEffect(() => {
        setAnswers({
            ...answers,
            multichoice: [
                { isTrue: value === 'a' ? true : false, answer: answerA },
                { isTrue: value === 'b' ? true : false, answer: answerB },
                { isTrue: value === 'c' ? true : false, answer: answerC },
                { isTrue: value === 'd' ? true : false, answer: answerD },
            ],
        });
    }, [answerA, answerB, answerC, answerD, value, setAnswers]);

    return (
        <div className='w-full'>
            <div className='hidden' onChange={handleOnChange}>
                <input
                    type='radio'
                    name='right-answer'
                    value='a'
                    id='option-a'
                />
                <input
                    type='radio'
                    name='right-answer'
                    value='b'
                    id='option-b'
                />
                <input
                    type='radio'
                    name='right-answer'
                    value='c'
                    id='option-c'
                />
                <input
                    type='radio'
                    name='right-answer'
                    value='d'
                    id='option-d'
                />
            </div>
            <div className='grid grid-cols-2 gap-5 my-5'>
                <label
                    htmlFor='option-a'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center'
                >
                    <input
                        value={answerA}
                        onChange={(e) => setAnswerA(e.target.value)}
                        placeholder='Type in answer'
                        readOnly={Preview ? true : false}
                        className=' text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1'
                    />
                    {value === 'a' ? (
                        <div className='w-[23px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[21px] h-[20px] rounded-full border-2  cursor-pointer'></div>
                    )}
                </label>
                <label
                    htmlFor='option-b'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center'
                >
                    <input
                        value={answerB}
                        onChange={(e) => setAnswerB(e.target.value)}
                        placeholder='Type in answer'
                        readOnly={Preview ? true : false}
                        className=' text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1'
                    />
                    {value === 'b' ? (
                        <div className='w-[23px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[21px] h-[20px] rounded-full border-2  cursor-pointer'></div>
                    )}
                </label>
                <label
                    htmlFor='option-c'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center'
                >
                    <input
                        value={answerC}
                        onChange={(e) => setAnswerC(e.target.value)}
                        placeholder='Type in answer'
                        readOnly={Preview ? true : false}
                        className=' text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1'
                    />
                    {value === 'c' ? (
                        <div className='w-[23px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[21px] h-[20px] rounded-full border-2  cursor-pointer'></div>
                    )}
                </label>
                <label
                    htmlFor='option-d'
                    className='h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center'
                >
                    <input
                        value={answerD}
                        onChange={(e) => setAnswerD(e.target.value)}
                        placeholder='Type in answer'
                        readOnly={Preview ? true : false}
                        className=' text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1'
                    />
                    {value === 'd' ? (
                        <div className='w-[23px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center'>
                            <i className='fas fa-check text-xs'></i>
                        </div>
                    ) : (
                        <div className='w-[21px] h-[20px] rounded-full border-2  cursor-pointer'></div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default MultiChoice;
