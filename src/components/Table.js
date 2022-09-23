import { v4 as uuidv4 } from 'uuid';

const Table = ({ thead = [], tbody }) => {
    console.log(thead);
    console.log(tbody);
    console.log(uuidv4());
    return (
        <div>
            <div className='overflow-x-auto relative shadow-md rounded-xl mt-[32px]'>
                <table className='w-full text-xl text-center text-gray-500 dark:text-gray-400'>
                    <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            {thead.map((head, index, arr) => {
                                if (index === arr.length - 1) {
                                    return (
                                        <th
                                            key={uuidv4()}
                                            scope='col'
                                            className='py-3 px-1'
                                        ></th>
                                    );
                                }
                                return (
                                    <th
                                        key={uuidv4()}
                                        scope='col'
                                        className='py-3 px-6'
                                    >
                                        {head}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tbody.map((body, indexBody) => {
                            const bodyKeys = Object.keys(body).filter((key) => {
                                return key !== 'id';
                            });
                            return (
                                <tr
                                    key={uuidv4()}
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
                                    <td className='py-4 px-1 font-medium whitespace-nowrap text-white'>
                                        <button className='rounded-lg bg-primary px-3 py-1.5'>
                                            View more
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {
                // <div>
                //     <ReactPaginate
                //         breakLabel='...'
                //         nextLabel='next >'
                //         // onPageChange={handlePageClick}
                //         pageRangeDisplayed={5}
                //         // pageCount={pageCount}
                //         previousLabel='< previous'
                //         renderOnZeroPageCount={null}
                //     />
                // </div>
            }
        </div>
    );
};

export default Table;
