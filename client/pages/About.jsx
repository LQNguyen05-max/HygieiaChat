const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">About</h1>
                <p className="text-lg text-gray-600 max-w-2xl text-center mb-4">
                    HygieiaChat was crafted with the intention of providing world class healthcare to anyone in the world.
                </p>

                <p className="text-lg text-gray-600 max-w-2xl text-center mb-4">
                    With our HygieiaChat bot, you can easily schedule appointments, share medical records, and receive personalized care from the comfort of your home. All of this and more with a couple of clicks.
                </p>
                
                <p className="text-lg text-gray-600 max-w-2xl text-center">
                    Are you a talented individual ready to join a team that is revolutionizing healthcare? Click here to apply!
                 </p>

                 <button>Careers</button>
        </div>
    );
}

export default About;