import { useEffect, useState } from 'react';
import HomeHeader from '../HomeHeader';
import { chart } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function ChartRender() {
    const CHART = useSelector((state) => state.CHART);
    console.log(CHART);
    const lable = CHART.map((e) => {
        return e.DATE;
    });
    const value = CHART.map((e) => {
        return e.TOTAL;
    });
    const sl = CHART.map((e) => {
        return e.SL;
    });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels: lable,
        datasets: [
            {
                label: 'Turnover',
                data: value,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <h2 style={{ color: 'GREEN' }}>
                Total Revenue :{' '}
                {value.reduce((s, e) => {
                    return (s += e);
                }, 0)}
                $
            </h2>
            <Bar options={options} data={data} />
        </div>
    );
}
function ChartForm({ from, to }) {
    const dispatch = useDispatch();

    fetch(`http://localhost:3000/admin/getdate`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            from: from,
            to: to,
        }),
    })
        .then((response) => response.json())
        .then((returnValue) => {
            if (returnValue.resoult.success) {
                dispatch(chart([...returnValue.resoult.data]));
            }
        });

    return <ChartRender></ChartRender>;
}
function MonthFrom({ month }) {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`http://localhost:3000/admin/getmonth`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                month: month.slice(5),
                year: month.slice(0, 4),
            }),
        })
            .then((response) => response.json())
            .then((returnValue) => {
                dispatch(chart([...returnValue.resoult.data]));
            });
    });

    return <ChartRender></ChartRender>;
}
export default function () {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [month, setMonth] = useState('');

    const [cover1, setCover1] = useState(false);

    const [cover2, setCover2] = useState(false);

    return (
        <div style={{ width: '1320px', height: '950px', backgroundColor: 'white' }}>
            <HomeHeader></HomeHeader>
            <div
                style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#e1e1e1',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                    <p style={{ margin: '0 15px', fontWeight: 'bold' }}>From :</p>
                    <input
                        onChange={(e) => {
                            setFrom(e.target.value);
                            setMonth('');
                            setCover2(false);
                        }}
                        value={from}
                        style={{ width: '150px' }}
                        type="date"
                    ></input>
                    <p style={{ margin: '0 15px', fontWeight: 'bold' }}>To :</p>
                    <input
                        onChange={(e) => {
                            setTo(e.target.value);
                            setMonth('');
                            setCover2(false);
                        }}
                        value={to}
                        style={{ width: '150px' }}
                        type="date"
                    ></input>
                    <button
                        onClick={() => {
                            setCover1(true);
                            setCover2(false);
                        }}
                        style={{ marginLeft: '15px' }}
                    >
                        search
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                    <p style={{ margin: '0 15px', fontWeight: 'bold' }}>MONTH :</p>
                    <input
                        onChange={(e) => {
                            setMonth(e.target.value);
                            setCover1(false);
                            setFrom('');
                            setTo('');
                        }}
                        value={month}
                        style={{ width: '150px' }}
                        type="month"
                    ></input>
                    <button
                        onClick={() => {
                            setCover2(true);
                            setCover1(false);
                        }}
                        style={{ marginLeft: '15px' }}
                    >
                        search
                    </button>
                </div>
            </div>
            {(cover1 && <ChartForm from={from} to={to}></ChartForm>) ||
                (cover2 && <MonthFrom month={month}></MonthFrom>)}
        </div>
    );
}
