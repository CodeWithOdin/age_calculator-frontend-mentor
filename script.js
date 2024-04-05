const form=document.querySelector(".age_form")

form.addEventListener("submit",function(e){
    e.preventDefault();
    const label_day=document.querySelector(".label_day")
    const label_month=document.querySelector(".label_month")
    const label_year=document.querySelector(".label_year")
    const dayempty=validator(label_day.parentElement);
    const monthempty=validator(label_month.parentElement);
    const yearempty=validator(label_year.parentElement);
    const d= new Date()
    const curr_year=d.getFullYear();

    if(!dayempty && !monthempty && !yearempty ){
        if(!dayempty && !monthempty){
        togglereverse(label_day.parentElement)
            togglereverse(label_month.parentElement)
    }
    if(!monthempty && !yearempty){
        togglereverse(label_month.parentElement)
            togglereverse(label_year.parentElement)
    }
    if(!dayempty && !yearempty){
        togglereverse(label_day.parentElement)
            togglereverse(label_year.parentElement)
    }
        const ip_day=label_day.parentElement.querySelector("input").value
        const ip_month=label_month.parentElement.querySelector("input").value
        const ip_year=label_year.parentElement.querySelector("input").value
        const last_day=new Date(ip_year,ip_month,0)
        const curr_day=d.getDate()
        const curr_month=d.getMonth()+1
        const rangeisvalid=checkRange(ip_day,ip_month,ip_year,last_day.getDate(),curr_year,label_day,label_month,label_year,curr_day,curr_month)
        if(rangeisvalid){
            togglereverse(label_day.parentElement)
            togglereverse(label_month.parentElement)
            togglereverse(label_year.parentElement)
            const actualAge=calculate(ip_day,ip_month,ip_year,last_day.getDate())
            const daytobeUpdated=actualAge[0]
            const monthtobeUpdated=actualAge[1]
            const yeartobeUpdated=actualAge[2]

            update(daytobeUpdated,monthtobeUpdated,yeartobeUpdated)
        }       
    }
    // Have to think how to use them. They are for removing red marks if only 2 are wrong
    
       
})

function update(day,month,year){
    let day_field=document.querySelector(".day")
    const month_field=document.querySelector(".mnth")
    const year_field=document.querySelector(".yr")

    let x=0
    let y=0
    let z=0
    const clearx=setInterval(e=>{
        day_field.innerHTML=++x;
    },50)
    const cleary=setInterval(e=>{
        month_field.innerHTML=++y;
    },50)
    const clearz=setInterval(e=>{
        year_field.innerHTML=++z;
    },50)


    setTimeout(e=>{
        clearInterval(clearx)
        day_field.innerHTML=day
    },500) 
    setTimeout(e=>{
        clearInterval(cleary)
        month_field.innerHTML=month
    },1000) 
    setTimeout(e=>{
        clearInterval(clearz)
        year_field.innerHTML=year
    },1300) 

}

function calculate(ip_day,ip_month,ip_year,last_day){
    const d=new Date()
    const curr_day=d.getDate()
    const curr_month=d.getMonth()+1
    const curr_year=d.getFullYear()

    let actualday=ip_day-curr_day;
    let ActualYear=curr_year-ip_year
    let actualmonth=ip_month-curr_month

    if(actualday>0 && actualmonth>0 ){
        actualmonth=11-actualmonth;
        const lastDateformat = new Date(curr_year,curr_month-1,0);
        const lastdate=lastDateformat.getDate()
        actualday=(lastdate-ip_day)+curr_day
        ActualYear-=1
    }

    if(actualmonth<0){
        if(actualday<0){
            actualday=-actualday;
            actualmonth=-actualmonth
        }
        else{
            actualmonth=-(actualmonth+=1)
            const lastDateformat = new Date(curr_year,curr_month-1,0);
            const lastdate=lastDateformat.getDate()

            actualday=lastdate-(ip_day-curr_day)
        }
        
    }
        
    if(actualday<0){
        if(ActualYear>0)
        ActualYear-=1;
        actualmonth=12-actualmonth;
        actualday=-actualday;
    }
    return [actualday,actualmonth,ActualYear]
}

function checkRange(ip_day,ip_month,ip_year,last_day,curr_year,label_day,label_month,label_year,curr_day,curr_month){
    let flag=0;

    if(ip_year==curr_year || ip_year>curr_year){
            if(ip_day>curr_day){
                label_day.parentElement.querySelector("p").innerHTML="Must be in past";
                toggle(label_day.parentElement)
                flag=1;
            }
            if(ip_month>curr_month){
                label_month.parentElement.querySelector("p").innerHTML="Must be in past";
                toggle(label_month.parentElement)
                flag=1;
            }
            else if(ip_day>curr_day && ip_month>curr_month ){
                label_day.parentElement.querySelector("p").innerHTML="Must be in past";
                label_month.parentElement.querySelector("p").innerHTML="Must be in past";
                toggle(label_day.parentElement)
                toggle(label_month.parentElement)
                flag=1;
            }


    }
    if(ip_year>curr_year){
        label_year.parentElement.querySelector("p").innerHTML="Must be in past";
        toggle(label_year.parentElement)
        flag=1;
    }

    if(ip_month>12){
        label_month.parentElement.querySelector("p").innerHTML="Must be less than equal to 12";
        toggle(label_month.parentElement)
        flag=1;
    }
    if(ip_month<=0){
        label_month.parentElement.querySelector("p").innerHTML="Must be greater than equal to 1";
        toggle(label_month.parentElement)
        flag=1;
    }
    if(ip_day<=0 || ip_day>last_day){
        label_day.parentElement.querySelector("p").innerHTML="Enter Valid Date"
        toggle(label_day.parentElement)
        flag=1;
    }

    if(flag===1)
    return false
    else
    return true
}

function validator(ele){
    if(ele.querySelector("input").value===""){
        toggle(ele)
        empty_msg(ele)
        return true;
    }
    return false;


}
function toggle(ele){
    ele.querySelector("input").classList.add("invalid");
    ele.querySelector("label").classList.add("invalid");
    ele.querySelector("p").classList.add("invalid")
    ele.querySelector("p").classList.add("error_msg")
    ele.querySelector("p").classList.remove("validate")
}

function togglereverse(ele){
    ele.querySelector("input").classList.remove("invalid");
    ele.querySelector("label").classList.remove("invalid");
    ele.querySelector("p").classList.remove("invalid")
    ele.querySelector("p").classList.remove("error_msg")
    ele.querySelector("p").classList.add("validate")
}
function empty_msg(ele){
    ele.querySelector("p").innerHTML="This field is required"
}
