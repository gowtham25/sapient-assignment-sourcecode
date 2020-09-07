import React from 'react';
import styled from 'styled-components';

const RocketDetailsContainer = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .individual-content-container {
        padding: 10px 10px 24px 10px;
        background: #FFF;
        text-align: center;
        img {
            width: 256px;
            min-width: 256px;
            background: #f2f2f2;
            min-height: 256px;
            color: #000;
            word-break: break-all;
            font-size: 13px;
        }
        .individual-content-details-container {
            .title {
                text-align
                margin-top: 7px;
                color: #4c558f;
                font-size: 13px;
                font-weight: 800;
            }
            .details-row-container {
                display: flex;
                flex-direction: column;
                margin-top: 15px;
               .details-row{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: baseline;
                    .row-label {
                        font-weight: bold;
                        font-family: fantasy;
                        text-align: right;
                    }
                    .row-value{
                        text-align: left;
                        color: #bfc3d3;
                        font-size: 13px;
                        font-weight: bold;
                        word-break: break-word;
                        left: 10px;
                        position: relative;
                    }
               } 
            }
        }
    }
    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

interface IRocketDetailsProps {
    rocketDetails: any;
}
const RocketDetails: React.FC<IRocketDetailsProps> = ({ rocketDetails }) => {
    return (
        <RocketDetailsContainer>
            {rocketDetails.map((rocketValue: any) => {
                const { details = '', mission_name = '', flight_number = '', mission_id = [], launch_year = '', launch_landing, links = {}, rocket = {} } = rocketValue || {};
                const { first_stage: { cores = [] } } = rocket || {};
                const { launch_success } = cores[0]
                const { mission_patch_small = '' } = links || {};
                return (
                    <div className='individual-content-container' key={flight_number}>
                        <img src={mission_patch_small} alt={details || mission_name} />
                        <div className='individual-content-details-container'>
                            <div className='title'>{`${mission_name} #${flight_number}`}</div>
                            <div className='details-row-container'>
                                <div className='details-row'>
                                    <div className='row-label'>Mission Id's:</div><div className='row-value'>
                                        {mission_id && mission_id.length > 0 ? mission_id.map((mVal: string, index: number) => {
                                            return <span className='id-list' key={index}>{`${mVal}, `}</span>
                                        }) : '-'}
                                    </div>
                                </div>
                                <div className='details-row'>
                                    <div className='row-label'>Launch Year:</div><div className='row-value'>{launch_year}</div>
                                </div>
                                <div className='details-row'>
                                    <div className='row-label'>Successful Launch:</div><div className='row-value'>{launch_success ? 'Yes' : 'No'}</div>
                                </div>
                                <div className='details-row'>
                                    <div className='row-label'>Successful Land:</div><div className='row-value'>{launch_landing === null ? 'N/A' : launch_landing ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </RocketDetailsContainer>
    )
}

export default RocketDetails;