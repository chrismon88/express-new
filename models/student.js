module.exports = (sequelize, DataTypes) =>{
    let Student = sequelize.define('Student',{

        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        starID:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            // regex to match starID pattern
            //two lowercase letters a-z, four digits, two lowercase letters a-z

            validate:{
                is:/^[a-z]{2}\d{4}[a-z]{2}$/

            }
        },
        present:{
            type: DataTypes.BOOLEAN,
            allowNull:false ,
            defaultValue: false
        }
    })

    //force will determine  to drop table
    //true will drop table every time app restarts. Will need this setting if changed
    //false will keep table
    Student.sync({force:false} ).then( ()=>{
        console.log('Synced student table ')
    })
    return Student
}