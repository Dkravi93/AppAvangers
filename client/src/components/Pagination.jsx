import React, { useState } from 'react'

const Pagination = ({setPage,page}) => {
    const [numbers, setNumbers] = useState([1,2,3]);
    const handleClick = (item) => {
        if(item == 1) {
            numbers[2] > 3 ? setNumbers(numbers.map((el)=> {
                return el - 1;
            })): setNumbers([1,2,3])
            setPage(numbers[0]);
            
        }
        if(item == 5){
            page < numbers[2] && setPage(numbers[2]+1);
            setNumbers(numbers.map((el)=> {
                return el + 1;
            }));
        }
    }

    return (
            <nav style={{margin: "20 auto", paddingLeft: "45%"}} aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={()=> handleClick(1)}><a className="page-link" href="#">&laquo;</a></li>
                    <li className="page-item" onClick={()=>setPage(numbers[0])}><a className="page-link" href="#">{numbers[0]}</a></li>
                    <li className="page-item" onClick={()=>setPage(numbers[1])}><a className="page-link" href="#">{numbers[1]}</a></li>
                    <li className="page-item" onClick={()=>setPage(numbers[2])}><a className="page-link" href="#">{numbers[2]}</a></li>
                    <li className="page-item" onClick={()=> handleClick(5)}><a className="page-link" href="#">&raquo;</a></li>
                </ul>
            </nav>
    )
}

export default Pagination
