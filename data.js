const players = [
    // Forwards
    { name: "Ivan Barbashev", number: 49, position: "L", handedness: "L" },
    { name: "Pavel Dorofeyev", number: 16, position: "R", handedness: "L" },
    { name: "Jack Eichel", number: 9, position: "C", handedness: "R" },
    { name: "Tomas Hertl", number: 48, position: "C", handedness: "L" },
    { name: "Alexander Holtz", number: 26, position: "R", handedness: "R" },
    { name: "Brett Howden", number: 21, position: "C", handedness: "L" },
    { name: "William Karlsson", number: 71, position: "C", handedness: "L" },
    { name: "Keegan Kolesar", number: 55, position: "R", handedness: "R" },
    { name: "Mitch Marner", number: 93, position: "R", handedness: "R" },
    { name: "Cole Reinhardt", number: 23, position: "L", handedness: "L" },
    { name: "Brandon Saad", number: 20, position: "L", handedness: "L" },
    { name: "Colton Sissons", number: 10, position: "C", handedness: "R" },
    { name: "Reilly Smith", number: 19, position: "R", handedness: "L" },
    { name: "Mark Stone", number: 61, position: "R", handedness: "R", captain: true },
    
    // Defensemen
    { name: "Noah Hanifin", number: 15, position: "D", handedness: "L" },
    { name: "Ben Hutton", number: 17, position: "D", handedness: "L" },
    { name: "Kaedan Korczak", number: 6, position: "D", handedness: "R" },
    { name: "Jeremy Lauzon", number: 5, position: "D", handedness: "L" },
    { name: "Brayden McNabb", number: 3, position: "D", handedness: "L" },
    { name: "Shea Theodore", number: 27, position: "D", handedness: "L" },
    { name: "Zach Whitecloud", number: 2, position: "D", handedness: "R" },
    
    // Goalies
    { name: "Adin Hill", number: 33, position: "G", handedness: "L" },
    { name: "Carl Lindbom", number: 30, position: "G", handedness: "L" },
    { name: "Akira Schmid", number: 40, position: "G", handedness: "L" }
];

const positionNames = {
    'L': 'Left Wing',
    'R': 'Right Wing', 
    'C': 'Center',
    'D': 'Defense',
    'G': 'Goalie'
};