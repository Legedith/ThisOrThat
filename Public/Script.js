// -----JS CODE-----
//@input Component.Head head
//@input float threshold = 0.2 {"widget" : "slider", "min" : 0, "max" : 1, "step" : 0.01}
//@input Asset.Texture[] image {"label": "Images"}

//@input Component.Image card
//@input Component.Text question
//@input Component.Text score

//@input SceneObject gameOverScreen
//@input SceneObject gameScreen

//@input SceneObject face

script.gameOverScreen.enabled = false;
var index = 0;
var headTransform = script.head.getSceneObject().getTransform();

var State = { "NONE": 0, "LEFT": 1, "RIGHT": 2 }
var currentState = State.None;
var score = 0;

var questions= ["Do you recycle plastic?",
            "Have you planted any plant/tree from past 3 months?",
"Have you been challenged by anyone for dumping waste?",
"Do you think you are guilty of over consuming food and products?",
"Do you know what e-waste is?",
"Do you know how much water you consume on a daily basis?",
"Do you think our world?s resources and environment are in severe danger?",
"Has air pollution ever affected the health of any of your family or friends?" ,
"Do you feel the pattern of weather is generally changing? ",
"Are you a member of any environmental organisations?",
"Worldwide Fund for Nature)?"];

script.createEvent("UpdateEvent").bind(onUpdate);

function onUpdate() {
    if (script.head.getFacesCount() > 0) {
        if (headTransform.up.x < -script.threshold & headTransform.up.x < -0.1) {
            if (currentState != State.LEFT) {
                currentState = State.LEFT;
                onLeft();
            }
        } else{
            if (headTransform.up.x > script.threshold & headTransform.up.x > 0.1) {
                if (currentState != State.RIGHT) {
                    currentState = State.RIGHT;
                    onRight();

                }
            }
            else{
                print("Neutral");
                currentState = State.None;
            }
        }
    } else {
    if (currentState != State.NONE) {
        currentState = State.NONE;
        onLost();
        }
    }
}

function onLeft() {
    print("LEFT!");
    changeImage();
}

function onRight() {
    print("RIGHT!");
    score++;
    changeImage();

}

function onLost() {
print("Head Lost")
}


var bubblePass = script.card.mainMaterial.mainPass;

function changeImage() {

   
    if (index == script.image.length-1)
    {
        index = 0;
        print(score);
        script.gameOverScreen.enabled = true;
        script.gameScreen.enabled = false;
        script.face.enabled = false;
        
        script.score.text = "Your score: "+score+"/10";
    }
    else{
        print(index);
        index++;
        bubblePass.baseTex = script.image[index]; 
        script.question.text = questions[index];
    }   
    
}
