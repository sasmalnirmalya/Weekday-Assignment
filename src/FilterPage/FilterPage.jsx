import ShowJobCards from '../BuildComponents/JobCards';
import BasicSelect from '../BuildComponents/Filters';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setFilter,initializeFilters } from '../States/Action-creators/actions';

function FilterPage({ filters, initializeFilters, setFilter }){

    let filtersList = [
        { 'name': 'Roles', values: ['Frontend', 'Backend', 'Fullstack'], style: {} },
        { 'name': 'Number of Employees', values: [], style: {} },
        { 'name': 'Experience', values: [1,2,3,4,5,6,7,8,9], style: {} },
        { 'name': 'Remote', values: ['Romote','Hybrid','Office'], style: {} },
        { 'name': 'Minimum Base Pay Salary', values: [4,10,15,20,25], style: {} },
    ];

    useEffect(() => {
        data = data.filter(job => {
            let match = true;
        
            if (filters['Minimum Base Pay Salary'] && job.minJdSalary < filters['Minimum Base Pay Salary']) {
              match = false;
            }
            if (filters.Experience && job.minExp < filters.Experience) {
              match = false;
            }
        
            return match;
          });

        console.log(data)
    }, [filters]);

    let [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();

    const handleFilterChange = (filterName, values) => {
        console.log(filterName,values);
        setFilter(filterName, values);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('loading')
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "limit": 10,
                    "offset": 0
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                };

                const response= await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
                const newData = await response.json();
                setData((prevData) => [...prevData, ...newData.jdList]);
                console.log(filters);
                setPage((prevPage) => prevPage + 1);
                    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    fetchData();
                }
            },
            { threshold: 1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, ['url', page, loading]);

    return (
        <>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {
                    filtersList.map((item,index)=>(<BasicSelect 
                        key={index}
                        name={item.name}
                        values={item.values}
                        onChange={(values) => handleFilterChange(item.name, values)}
                        />)
                    )
                }
            </div>
            
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {
                    data.map((item, index) => (
                        <ShowJobCards key={index} details={item}></ShowJobCards>
                    ))
                }
                <div ref={containerRef} style={{ height: '10px', background: 'transparent' }} />
                {loading && <div>Loading...</div>}
            </div>
            
        </>
    )
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = {
    setFilter,
    initializeFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);