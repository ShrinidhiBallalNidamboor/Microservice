## Project Management Microservice

Manages projects of organizations, sprints and issues

### Endpoints
1. POST /project
    - add project to organization

2. GET /projects?organization_id=?
    - fetches all projects of an organization

3. GET /projects/{id}
    - get information about project

4. GET /projects/{id}/sprints
    - get all sprints of a project

5. GET /projects/{id}/sprints/{id}
    - get particular sprint info

6. GET /projects/{id}/sprints/{id}/issues
    - get all issues of a sprint

7. POST /projects/{id}/sprints/{id}/issues
    - add issue to sprint

8. PUT /projects/{id}/sprints/{id}/issues
    - update issue

9. POST /projects/{id}/sprints
    - create a new sprint

10. PUT /projects/{id}/sprints/{id}/complete
    - complete a sprint