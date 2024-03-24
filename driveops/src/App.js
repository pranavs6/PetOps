function Pump(){
    return (
        <button> PUMP </button>
    );
}

function Push(){
    return (
        <button> PUSH </button>
    );
}

export default function app(){
    return (
        <div>
        <iframe src="http://127.0.0.1:5000/video" style={{alignItems:"center", width:"640px", height:"480px"}} />
        <div>
            <h1>Push food</h1>
            <Push />
        </div>
        <div>
            <h1>Pump liquid</h1>
            <Pump />
        </div>
        </div>
    );

}
