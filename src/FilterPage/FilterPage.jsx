import ShowJobCards from '../BuildComponents/JobCards';
import BasicSelect from '../BuildComponents/Filters';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setFilter,initializeFilters } from '../States/Action-creators/actions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function FilterPage({ filters, initializeFilters, setFilter }){

    let filtersList = [
        { 'name': 'Roles', values: ['frontend', 'ios', 'android','tech lead', 'backend'] },
        { 'name': 'Number of Employees', values: [20,200,2000,20000]},
        { 'name': 'Experience', values: [1,2,3,4,5,6,7,8,9] },
        { 'name': 'Remote', values: ['Romote','Hybrid','Office'] },
        { 'name': 'Minimum Base Pay Salary', values: [4,10,15,20,25,30,40,50] },
    ];

    function applyFilter(jobs){
        return jobs.filter(job => {
            let match1 = true;
            let match2 = true;
            let match3 = true
        
            if (filters[4]['values'] && job.minJdSalary < filters[4]['values']) {
              match1 = false;
            }
            if (filters[2]['values'] && job.minExp < filters[2]['values']) {
              match2 = false;
            }

            if( filters[0]['values']!=='' && job.jobRole !== filters[0]['values']) {
                match3=false
            }
        
            return match1 && match2 && match3;
        })
    };

    useEffect(() => {
        setData(applyFilter(data));
    }, [filters]);

    let [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();

    const handleFilterChange = (filterName, values) => {
        setFilter(filterName, values);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
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
                const filteredData = applyFilter(newData.jdList);
                setData((prevData) => [...prevData, ...filteredData]);
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
                <Box
                    component="form"
                    sx={{ width: '300px' }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                </Box>
            </div>
            
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '50px'}}>
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