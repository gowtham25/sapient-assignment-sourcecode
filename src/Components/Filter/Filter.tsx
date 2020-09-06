import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    background: #FFF;
    width: 90%;
    // border-radius: 10px;
    height: 563px;
    .filter-title {
        text-align: left;
        left: 6px;
        position: relative;
        font-weight: 700;
    }
    .filter-individual-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 17px;
        .filter-content-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            .item {
                text-align: center;
                margin: 5px 22px;
                background: #c6e099;
                padding: 6px;
                border-radius: 7px;
                width: 37px;
                cursor: pointer;
                color: #000;
                font-size: 12px;
                font-weight: 600;
                &.active {
                    background: #7bbb00;
                }       
            }
        }
        .title {
            border-bottom: 1px solid #dedddb;
            width: 70%;
            padding-bottom: 3px;
            margin-bottom: 6px;
            font-size: 13px;
        }
    }
`;

const launchYear = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

interface IFilterProps {
    activeYear: string,
    setActiveYear: (val: any) => void;
    successfulLaunch: string;
    setSuccessfulLaunch: (val: any) => void;
    successfulLanding: string;
    setSuccessfulLanding: (val: any) => void;
    setIsManuallyChanges: (val: boolean) => void;
}

const Filter: React.FC<IFilterProps> = ({ setIsManuallyChanges, activeYear, setActiveYear, successfulLaunch, setSuccessfulLaunch, successfulLanding, setSuccessfulLanding }) => {
    return (
        <FilterContainer>
            <p className='filter-title'>Filter</p>
            <div className='filter-individual-container'>
                <div className='title'>
                    Launch Year
                </div>
                {/* loop through the year to generate the element */}
                <div className='filter-content-container'>
                    {launchYear.map((value) => (<div onClick={() => { setIsManuallyChanges(true); setActiveYear(value) }} className={parseInt(activeYear) === value ? 'active item' : 'item'} key={value}>{value}</div>))}
                </div>
            </div>
            <div className='filter-individual-container'>
                <div className='title'>
                    Successful Launch
                </div>
                <div className='filter-content-container'>
                    <div onClick={() => { setIsManuallyChanges(true); setSuccessfulLaunch('true') }} className={successfulLaunch === 'true' ? 'active item' : 'item'}>True</div>
                    <div onClick={() => { setIsManuallyChanges(true); setSuccessfulLaunch('false') }} className={successfulLaunch === 'false' ? 'active item' : 'item'}>False</div>
                </div>
            </div>
            <div className='filter-individual-container'>
                <div className='title'>
                    Successful Landing
                </div>
                <div className='filter-content-container'>
                    <div onClick={() => { setSuccessfulLanding('true') }} className={successfulLanding === 'true' ? 'active item' : 'item'}>True</div>
                    <div onClick={() => { setSuccessfulLanding('false') }} className={successfulLanding === 'false' ? 'active item' : 'item'}>False</div>
                </div>
            </div>
        </FilterContainer>
    )
}

export default Filter;