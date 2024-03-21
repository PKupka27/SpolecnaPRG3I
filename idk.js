window.onload = function(){ 

    let persons = [
        { id: 1, name: 'John', age: 30, city: 'New York', position:  'Software'},
        { id: 2, name: 'Alice', age: 25, city: 'San Francisco', position:  'Software' },
        { id: 3, name: 'Bob', age: 35, city: 'Los Angeles', position:  'Hardware' },
        { id: 4, name: 'Eva', age: 28, city: 'Chicago', position:  'Marketing' },
        { id: 5, name: 'Mike', age: 40, city: 'Seattle', position:  'Software' },
        { id: 6, name: 'Sophia', age: 22, city: 'Miami', position:  'Marketing' },
        { id: 7, name: 'David', age: 45, city: 'Boston', position:  'Software' },
        { id: 8, name: 'Olivia', age: 32, city: 'Denver', position:  'Software' },
        { id: 9, name: 'Chris', age: 27, city: 'Austin', position:  'Hardware' },
        { id: 10, name: 'Emma', age: 33, city: 'San Diego' , position:  'Hardware'}
      ];

    let employees = [];
    persons.forEach(person => {
        let employee = new Employee(person.id, person.name, person.age, person.city, person.position);
        employees.push(employee);
        let employeesOver30 = employees.filter(employee => employee.age > 30);
        console.log("Employees over 30:", employeesOver30);
        let metaEmployees = [];
        let appleEmployees = [];
        let microsoftEmployees = [];
        metaEmployees = employees.filter(employee => employee.position === 'Software' && employee.age <= 50);
        appleEmployees = employees.filter(employee => employee.position === 'Software' || employee.position === 'Hardware');
        microsoftEmployees = employees.filter(employee => employee.position === 'Marketing' || employee.city.startsWith('San'));
        let companies = {
            Meta: metaEmployees,
            Apple: appleEmployees,
            Microsoft: microsoftEmployees
            for (const [company, employees] of Object.entries(companies)) {
                console.log(company + " employees:", employees);
}