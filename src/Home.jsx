export default function Home() {
    return (
        <div className="container">
            <h1 className="text-center my-3">Make My Sledge</h1>
            <p>Welcome to our platform dedicated to sledges and sled dogs enthusiasts! Here, you can not only create your own custom sledge but also explore the unique characteristics and qualities of each sled dog that makes up a sled team. Whether you're fascinated by the bond between humans and animals in the winter context or simply curious to learn more about this traditional art, our site is here to inspire and inform you. Dive into this captivating world where tradition, performance, and passion converge!</p>
            <div className="text-center my-5">            
                <a href={`make_sledge`} className="btn btn-primary mx-3">Make my sledge</a>
                <a href={`dogs`} className="btn btn-primary mx-3">See the dogs</a>
                
            </div>
        </div>
            
    );
}