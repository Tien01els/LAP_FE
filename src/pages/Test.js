import React from 'react';
import { useState } from 'react';
import MultiChoiceAnswer from '../components/Student/MultiChoiceAnswer';

const Test = () => {
    // const answer = {
    //   multiChoice: [{ answer: '10' }, { answer: '10' }, { answer: '10' }],
    // }

    const [answers, setAnswers] = useState({
        multiChoice: [
            { answer: 'Cau 1' },
            { answer: 'Cau 2' },
            { answer: 'Cau 3' },
            { answer: 'Cau 4' },
        ],
    });

    return (
        <div className='flex flex-col items-center mt-10 w-full h-screen bg-white'>
            <MultiChoiceAnswer answers={answers.multiChoice} setAnswers={setAnswers} />
        </div>
    );
};

export default Test;
