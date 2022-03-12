INSERT INTO departments (department_name)
VALUES  ('financial'),
        ('technical'),
        ('HR'),
        ('managers');


INSERT INTO roles (department_id, title, salary)
VALUES  (3, 'Intern', 10000),
        (3, 'Secretary', 55000),
        (4, 'CEO', 100000),
        (2,'Tech', 65000),
        (4, 'Manager', 70000);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Bob', 'Stranger', 2),
        ('Amy', 'Violet', 3),
        ('Parker', 'Blue', 4),
        ('Bruce', 'Falsey', 5),
        ('Tackle', 'Box', 1);