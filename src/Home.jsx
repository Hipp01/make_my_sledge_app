export default function Home() {
    return (
        <div className="container">
            <h1 className="text-center my-3">Make My Sledge</h1>
            <div className="text-center my-5">            
                <a href={`make_sledge`} className="btn btn-primary mx-3">Make my sledge</a>
                <a href={`dogs`} className="btn btn-primary mx-3">See the dogs</a>
                
            </div>
        </div>
            
    );
}