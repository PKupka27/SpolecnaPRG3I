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

      // komenty ponechejte a pod koment vzdy dejte jen cast kodu ktera tomu odpovída
      // po kazdem bodě commitněte do gitu

      // 1. pomocí foreach cyklu na persons poli, 
      // do pole employees vytvorte nove zamestnance pomoci new Employee
    let employees = [];

    persons.forEach(person => {
      employees.push(new Employee(person.id, person.name, person.age, person.city, person.position));
    });
  
    // 2. Vypiste do konzole pouze zamestnance kteří mají věk nad třicet

    employees.filter(employee => employee.age > 30).forEach(employee => {
      console.log(employee);
    });

    // 3 Vytvorte tri firmy Meta, Apple, Microsoft

    let meta = new Company("Meta");
    let apple = new Company("Apple");
    let microsoft = new Company("Microsoft");

    // vše pomoci cyklů, filtrů apod.
    // 4 Do firmy Meta vlozte zamestnance s pozicí Software a věkem do 50 let 

    employees.filter(employee => employee.position === 'Software' && employee.age <= 50).forEach(employee => {
      meta.addEmployee(employee);
    });

    // 5 Do Apple vlozte zamestnance s pozicí Software nebo Hardware

    employees.filter(employee => employee.position === 'Software' || employee.position === 'Hardware').forEach(employee => {
      apple.addEmployee(employee);
    });

    // 6 do Microsoft vlozte pouze zamestnance s pozicí Marketing nebo zamestnance s mestem zacinajicím na San

    employees.filter(employee => employee.position === 'Marketing' || employee.city.startsWith('San')).forEach(employee => {
      microsoft.addEmployee(employee);
    });

    // 7 firmy vlozte do pole 

    let companies = [meta, apple, microsoft];

    // 8 projdete cyklem vsechny firmy a vypiste jejich zamestnance do console

    companies.forEach(company => {
      console.log(`Employees in ${company.name}:`);
      company.employees.forEach(employee => {
          console.log(employee);
      });
    });
    
    // 9 pushnete do spolecne repo do vetve pod svym jménem 

}