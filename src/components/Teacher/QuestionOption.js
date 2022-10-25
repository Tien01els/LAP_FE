import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';

import { API_URL } from '../../constant';

const QuestionOption = ({
    selectedSkills,
    setSelectedSkills,
    setSelectedLevel,
}) => {
    const teacherId = 1;

    const levelOption = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const [listGrade, setListGrade] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState();
    const [listTopic, setListTopic] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState();
    const [listSkill, setListSkill] = useState([]);

    const selectLevel = useRef();
    const convertResToOption = (value, label) => {
        return {
            value: value,
            label: label,
        };
    };

    useEffect(() => {
        axios.get(API_URL + `grade/teacher/${teacherId}`).then((res) => {
            const grades = res.data;
            const option = [];
            option.push({
                value: null,
                label: 'All Grades',
            });
            for (let i = 0; i < grades.length; i++)
                option.push(
                    convertResToOption(grades[i].id, grades[i].gradeName)
                );
            setListGrade(option);
        });
    }, []);

    useEffect(() => {
        axios
            .get(API_URL + `topic/teacher/${teacherId}/grade/${selectedGrade}`)
            .then((res) => {
                const topics = res.data;
                const option = [];
                option.push({
                    value: null,
                    label: 'All Topics',
                });
                for (let i = 0; i < topics.length; i++)
                    option.push(
                        convertResToOption(topics[i].id, topics[i].topicName)
                    );
                setListTopic(option);
            });
    }, [selectedGrade]);

    useEffect(() => {
        axios.get(API_URL + `skill/topic/${selectedTopic}`).then((res) => {
            const skills = res.data;
            const option = [];
            for (let i = 0; i < skills.length; i++)
                option.push(
                    convertResToOption(skills[i].id, skills[i].skillName)
                );
            setListSkill(option);
        });
    }, [selectedTopic]);

    return (
        <div>
            <div className='mb-4'>
                <span>Question options</span>
            </div>
            <div className='flex flex-col justify-between items-center gap-3'>
                <div className='flex flex-start justify-between gap-2 w-full'>
                    <Select
                        defaultValue={listGrade[0]}
                        onChange={(e) => setSelectedGrade(e.value)}
                        options={listGrade}
                        placeholder='Grade'
                        className='w-[50%]'
                    />
                    <Select
                        ref={selectLevel}
                        options={levelOption}
                        placeholder='Level'
                        onChange={(e) => setSelectedLevel(e.value)}
                        className='w-[50%]'
                    />
                </div>
                {listTopic.length > 1 && (
                    <Select
                        defaultValue={listTopic[0]}
                        onChange={(e) => setSelectedTopic(e.value)}
                        options={listTopic}
                        placeholder='Topic'
                        className='w-full'
                    />
                )}
                {listSkill.length > 0 && (
                    <Select
                        defaultValue={[]}
                        closeMenuOnSelect={false}
                        onChange={(e) =>
                            setSelectedSkills((prev) => {
                                const values = [];
                                console.log(prev);
                                for (let i = 0; i < e.length; ++i)
                                    values.push(e[i].value);
                                return values;
                            })
                        }
                        isOptionDisabled={() => selectedSkills.length >= 3}
                        options={listSkill}
                        isMulti
                        placeholder='Skill'
                        className='w-full'
                    />
                )}
            </div>
        </div>
    );
};

export default QuestionOption;
