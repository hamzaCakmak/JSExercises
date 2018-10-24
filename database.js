class Course {
	constructor(name, time, date, rooms){
		this.name = name
		this.time = time
		this.date = date
		this.rooms = rooms	
	}
	
	toString(){
		
	return "Name: "+this.name +" Time : "+this.time+" Date: "+this.date+
	" Rooms: "+this.rooms
	
	}
}

class Student {
	constructor(id, name, gpa, courses){
		this.id = id
		this.name = name
		this.gpa = gpa
		this.courses = courses	
	}
	
	toString(){
	
	return "Id: "+this.id+" Name: "+this.name+" Gpa: "+this.gpa
	+" Courses: "+this.courses

	}
}


