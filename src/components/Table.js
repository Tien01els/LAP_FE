import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';

const Table = ({
    checkboxTable = false,
    thead = [],
    tbody = [],
    actions = [],
}) => {
    return (
        <div>
            <div className='overflow-x-auto relative shadow-lg rounded-xl mt-[8px]'>
                <table className='w-full text-xl text-center text-gray-500 dark:text-gray-400'>
                    <thead className='text-base text-gray-700 uppercase font-semibold bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            {checkboxTable && (
                                <th
                                    scope='col'
                                    className='p-4'
                                    style={{ width: '5%' }}
                                >
                                    <div className='flex items-center'>
                                        <input
                                            type='checkbox'
                                            className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                        />
                                        <label className='sr-only'>
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                            )}
                            {thead &&
                                thead.map((head, index, arr) => {
                                    if (index === arr.length - 1) {
                                        return (
                                            <th
                                                key={uuidv4()}
                                                style={{ width: head.width }}
                                                scope='col'
                                                className='py-3 px-1'
                                            ></th>
                                        );
                                    }
                                    return (
                                        <th
                                            key={uuidv4()}
                                            style={{ width: head.width }}
                                            scope='col'
                                            className='py-3 px-6'
                                        >
                                            {head.title}
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody className='text-base'>
                        {tbody &&
                            tbody.map((body, indexBody) => {
                                const bodyKeys = Object.keys(body).filter(
                                    (key) => {
                                        return key !== 'id';
                                    }
                                );
                                return (
                                    <tr
                                        key={body.id}
                                        className='odd:bg-white even:bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700'
                                    >
                                        {bodyKeys.map((bodyKey, index) => {
                                            return (
                                                <th
                                                    key={uuidv4()}
                                                    className='py-4 px-6 font-medium whitespace-nowrap dark:text-white'
                                                >
                                                    {body[bodyKey]}
                                                </th>
                                            );
                                        })}
                                        <td className='py-4 px-1 font-medium whitespace-nowrap text-white flex justify-evenly'>
                                            {actions.map((action, index) => {
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            action.name +
                                                            body.id
                                                        }
                                                    >
                                                        <Button
                                                            className='rounded-lg border-none text-sm font-semibold bg-primary px-3 py-1.5'
                                                            onClick={() => {
                                                                action.eventAction &&
                                                                    action.eventAction(
                                                                        body.id
                                                                    );
                                                            }}
                                                        >
                                                            {action.name}
                                                        </Button>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
