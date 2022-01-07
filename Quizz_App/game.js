const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which driver has the right of way in a roundabout?",
        choice1: 'A driver already in the roundabout',
        choice2: 'A driver turning right into the roundabout',
        choice3: 'A driver turning left into the roundabout',
        choice4: 'A driver approaching the roundabout',
        answer: 1,

        // Explanation:  Roundabouts can be somewhat confusing. Drivers should be sure to yield the roadway to vehicles already in the roundabout, even those who may have turned into it just as they approached. Drivers should be sure to enter the roundabout when it is safe and appropriate to do so, in order to avoid blocking their lane, but if in doubt they should yield right-of-way to other drivers – it’s the best way to avoid an accident.
    },
    {
        question:
            "Are drivers responsible for their passengers buckling up?",
        choice1: "Only if the passengers are over 16 years of age",
        choice2: "Only if the passengers are in the front seat",
        choice3: "Only if the passengers are in the back seat",
        choice4: "Only if the passengers are under 16 years of age",
        answer: 4,
        //Explanation:  Drivers must ensure that all passengers below the age of 16 are safely buckled up. Drivers are also required to ensure that younger passengers travel in appropriate seats: infant, toddler or booster seats must be used and properly secured according to the age of the children in the vehicle. This law applies even if the children are not the driver’s children and even if the children’s parent(s) give ‘permission’ to drive their children without proper safety seats. It is the driver, not the children’s parent(s), who will be charged if the children are not properly buckled up. Passengers 16 years of age and over are responsible for their own seatbelts and can be charged if not properly buckled up.
    },
    {
        question: "A white arrow painted on a lane means...?",
        choice1: "You may move only in the direction of the arrow",
        choice2: "Stop before the arrow and yield to pedestrians",
        choice3: "It shows where you must stop",
        choice4: "Move to the far left or far right lane as soon as the way is clear",
        answer: 1,
    },
    {
        question: "When it is safe to do so, passing other vehicles on the right side",
        choice1: "Is permitted providing it is possible to do so by driving on the shoulder of the road",
        choice2: "Is not permitted under any circumstance",
        choice3: "Is permitted at any time on any street or highway",
        choice4: "Is permitted when the street or highway has two or more lanes for traffic in the direction the vehicle is traveling.",
        answer: 4,
        //Explanation:  When driving on a multi-lane roadway, drivers in right lanes may pass traffic driving in lanes to the left provided it is safe to do so. Generally, the leftmost lane to the center line is intended for passing. After passing, drivers should move to the right lane(s) to permit other, faster drivers to pass. It is helpful if drivers follow this general rule of the road, but it is not required by law.
    },
    {
        question:"Why must a vehicle undergo emission testing?",
        choice1:"Because the vehicle may be grossly polluting the environment",
        choice2:"Because the vehicle registration needs to be renewed",
        choice3:"All answers are correct",
        choice4:"Because the vehicle is past a certain age",
        answer:3,
        //Explanation:  Emission testing is used mainly to determine if a vehicle is grossly polluting the environment. Since this often happens with older vehicles, vehicles that have passed a certain age are required to undergo emission testing before the registration can be renewed. If testing determines that the vehicle is grossly polluting the environment, registration is not renewable until appropriate repairs are made to reduce emissions. Drivers should ensure that regular maintenance is performed to help reduce harmful emissions from their vehicles.
    },
    {
        question:"If a signal light changes from green to amber as a driver approaches an intersection, what should the driver do?",
        choice1:"Sound horn to warn pedestrians and other drivers that the vehicle will travel through the intersection.",
        choice2:"Stop. If stop cannot be made safely, proceed with caution",
        choice3:"Maintain current speed and continue through the intersection",
        choice4:"Speed up to clear the intersection as quickly as possible",
        answer:2,
        //Explanation:  The expression “Green means go; yellow means go faster” is incorrect, and gives drivers the wrong idea when approaching an intersection as the light turns amber. In every case where it is safe to do so, drivers must make a full stop at the intersection and wait for the next green light before proceeding. If it is not safe to stop, drivers should continue through the intersection, exercising great caution as there may be oncoming traffic attempting to turn left, or even drivers from the other street ‘jumping’ the green light (proceeding through the intersection before the light has actually changed green). Always perform a ‘left-center-right’ visual sweep of intersections before driving through them.
    },
    {
        question:"When arriving at an intersection which has no stop line, crosswalk or sidewalk, where must drivers stop?",
        choice1:"Right beside the stop sign",
        choice2:"Right before the stop sign",
        choice3:"At the edge of the intersection",
        choice4:"A little into the intersection",
        answer:3
        
    },
    {
        question:"Upon approaching a stop sign, what dose the law require dirvers to do before entering the intersection?",
        choice1:"Stop, and when it is safe to do so, proceed",
        choice2:"Stop, sound horn, then proceed",
        choice3:"Slow down, sound horn and proceed",
        choice4:"Slow down and if the way is clear, proceed",
        answer: 1,
        //Explanation:  Drivers must come to a complete stop before entering an intersection controlled by stop signs. Always use caution at these intersections, driving defensively to avoid being in an accident if other drivers do not observe this law.
    },
    {
        question:"When passing a cyclist, allow at least..",
        choice1:"2 metres between the vehicle and the cyclist",
        choice2:"3 metres between the vehicle and the cyclist",
        choice3:"5 metres between the vehicle and the cyclist",
        choice4:"1 metre between the vehicle and the cyclist",
        answer: 4,
        //Explanation:  Allowing space between the vehicle and the cyclist ensures the safety of the cyclist. Cyclists need space for a number of reasons: wind turbulence from passing vehicles may affect cyclists; cyclists may have to move over on the road to avoid grates or potholes, and so on.
        
    },
    {
        question:"If an emergency vehicle with lights on and sirens sounding is travelling on a street that allows for two-way traffic, what does the law require drivers to do?",
        choice1:"Continue at the same speed",
        choice2:"Speed up and get out of the way",
        choice3:"Signal the driver to pass",
        choice4:"Pull to the right as far as possible and stop",
        answer:4,
        //Explanation:  When all vehicles driving in both directions correctly pull off to the right, emergency vehicles are able to proceed quickly to their destination, which may save lives. Drivers in the left lane on roads with four lanes of traffic must use caution when pulling to the right so they do not hit vehicles that may already be in the right lane. Emergency vehicles often travel along the middle of the road and sometimes use oncoming traffic lanes to get through intersections. Drivers should not drive on until emergency vehicles have passed, and should use appropriate caution when accelerating back to roadway speed, especially if a lane change is required.
    },
    {
        question:"When towing a trailer or boat, the driver of a motor vehicle is not permitted to carry the following in the trailer or boat:",
        choice1:"Flammable materials",
        choice2:"Camping equipment",
        choice3:"People",
        choice4:"Firearms",
        answer:3,
        // Explanation:  It is dangerous to carry people in a trailer or boat. Trailers and boats are more subject to damage in an accident. People in trailers or boats are at great risk of serious injury or death in the event of an accident.
        
    },
    {
        question:"A person whose driver licence is under suspension, may",
        choice1:"operate a motor vehicle to and from work",
        choice2:"not operate a vehicle under any circumstances",
        choice3:"operate a motor vehicle when accompanied by a licensed driver",
        choice4:"operate a motor vehicle in the case of an extreme emergency",
        answer:2,
        //Explanation:  If a driver’s license is under suspension, it is the same as if the driver does not have a license. It is illegal to drive without a license or with a suspended license, regardless of the circumstance. Even in an emergency, drivers must not drive with a suspended license: they should call 9-1-1 for appropriate emergency assistance.
        
    },
    {
        question:"When parked facing uphill with a curb:",
        choice1:"The front wheels must be parallel to the curb",
        choice2:"Turn the steering wheel to the left",
        choice3:"The direction of the wheels doesn't matter as long as the parking brake is set",
        choice4:"Turn the steering wheel to the right",
        answer:2,
        //Explanation:  Turn the steering wheel to the left so the wheels are turned towards the road if you are facing uphill with a curb. The tires will catch the curb if it rolls backward.
        
    },
    {
        question:"On roads which have a median, when must drivers stop for school buses?",
        choice1:"Everytime the bus stops",
        choice2:"Upon every approach to a school bus",
        choice3:"There is no need to stop roads with a median",
        choice4:"When behind a stopped bus which has its upper red lights flashing",
        answer:4,
        //Explanation:  Stopping for school buses is the law; this law is designed to protect school children who need to cross streets to get on or off the bus. Drivers are required to know the law and stop for school buses. Failure to stop at the appropriate time and place could result in injury or death to children who may be crossing the roadway and will result in criminal charges to the driver of the vehicle. Drivers should always use caution near school buses because some children may not be aware of other traffic on the road.
        
    },
    {
        question:"On a roadway where traffic is moving in both directions, in what lane must a driver be before making a left turn?",
        choice1:"The lane closest to the right-hand side of the roadway",
        choice2:"The lane does not matter provided the driver signals",
        choice3:"The lane closest to the left-hand side of the roadway",
        choice4:"The lane immediately to the right of the center line of the roadway",
        answer:4,
        //Explanation:  Turning left from the appropriate lane is an important safety measure both for the driver of the vehicle and for other drivers on the road. It is dangerous to attempt to turn left by cutting across other lanes of traffic travelling in the same direction. If there are vehicles in the other lanes, the driver turning left will likely be in an accident involving those vehicles, or could cause other accidents when drivers of those vehicles take evasive action to avoid a collision with the driver.
        
    },
    {
        question:"When driving with headlights on, in what situations are drivers required to use low beam headlights?",
        choice1:"within 30 metres of an oncoming vehicle",
        choice2:"within 50 metre of an oncoming vehicle",
        choice3:"within 300 metres of an oncoming vehicle",
        choice4:"within 150 metres of an oncoming vehicle",
        answer:4,
        // Explanation:  Drivers of oncoming vehicles can be blinded by high beam headlights, potentially causing accidents, so all drivers should ensure that they switch to low beam headlights within the required distance. When travelling at night on roads with hills or curves, be sure to look up and well ahead to spot oncoming lights and be prepared to switch to low beams at the appropriate time so that drivers of oncoming vehicles are not blinded as they come around a corner or over a hill.
        
    },
    {
        question:"In what lane must drivers be before making a left turn from a one-way street?",
        choice1:"In the lane closest to the left-hand side of the roadway",
        choice2:"In the lane closest to the center line of the roadway",
        choice3:"In the lane closes to the right-hand side of the roadway",
        choice4:"The lane does not matter provided the driver signals",
        answer:1,
        //Explanation:  On a one-way street, all traffic is expected to drive in the same direction. Turning left from the left-most lane means that the driver does not have to cut across other drivers on the roadway. It is dangerous to attempt to turn left by cutting across other lanes of traffic travelling in the same direction. If there are vehicles in the other lanes, the driver turning left will likely be in an accident involving those vehicles, or could cause other accidents when drivers of those vehicles take evasive action to avoid a collision with the driver.
        
    },
    {
        question:"High Occupancy Vehicle (HOV) lanes on provincial highways are reserved for vehicles with how many occupants?",
        choice1:"Any vehicle that is travelling above the posted speed limit",
        choice2:"4 or more people",
        choice3:"At least 2 people",
        choice4:"3 or more people",
        answer:3,
        //Explanation:  HOV lanes are for vehicles with higher occupancy. The intention is to encourage carpooling, thus reducing the number of vehicles on the road. Drivers who carpool are ‘rewarded’ with these special lanes where there is less likelihood of traffic congestion, so they are able to travel at or near posted speeds and get to their destination sooner. HOV lanes are not to be used as ‘Speeding’ lanes. Some drivers ‘tailgate’ vehicles which are driving at the posted speed limit in HOV lanes because they want to speed. It is illegal to tailgate other vehicles, and it is illegal to speed. If a driver is being tailgated and is concerned about safety, the driver should signal and pull over to the closest right lane when lane markings permit and it is safe to do so.
        
    },
    {
        question:"How many meters in both directions must drivers be able to see in order to make a legal U-turn?",
        choice1:"100 metres",
        choice2:"150 metres",
        choice3:"250 metres",
        choice4:"50 metres",
        answer:2,
        //Explanation:  Good visibility is important in making U-turns. Drivers must ensure that they have sufficient time to complete the U-turn and accelerate to proper driving speed, so they must be able to see far enough in both directions to determine that they will have sufficient time to perform the manoeuver.
        
    },
    {
        question:"Where there are no posted speed limits, the maximum speed in cities, towns and villages is:",
        choice1:"50km/h",
        choice2:"60km/h",
        choice3:"30km/h",
        choice4:"40km/h",
        answer:1,
        //Explanation:  All drivers are expected to know and adhere to this speed limit. Ignorance of this law will not be accepted as an excuse if a driver is caught driving over this limit.
        
    }

]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()