import graphene

# Authentication Schemas
from users.schema import AuthMutation, AuthQuery

from courses.schema import Query as CourseQuery, Mutation as CourseMutation
from exams.schema import Query as ExamQuery, Mutation as ExamMutation

class Mutation(AuthMutation, CourseMutation, ExamMutation, graphene.ObjectType):
   pass

class Query(AuthQuery, CourseQuery, ExamQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)