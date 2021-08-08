from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from exams.models import Exam, StudentLog
from users.models import User
from courses.models import CourseUser, Course

import graphene


class ExamType(DjangoObjectType):
    class Meta:
        model = Exam

class StudentLogType(DjangoObjectType):
    class Meta:
        model = StudentLog
        

class CreateExam(graphene.Mutation):

    # model
    exam = graphene.Field(ExamType)

    success = graphene.Boolean()
    
    class Arguments:
        name = graphene.String(required=True)
        course_id = graphene.ID()
        start_time = graphene.DateTime()
        end_time = graphene.DateTime()
        submit_duration = graphene.Int()
        total_marks = graphene.Int()

    @classmethod
    def mutate(cls, root, info, name, course_id, start_time, end_time, submit_duration, total_marks):
        user = info.context.user

        if (user.is_authenticated):

            if (not user.is_teacher):
                raise Exception("You must be a teacher to perform this task!")
            
            # check if the user has the course
            course = Course.objects.filter(id = course_id, primary_teacher=user)
            
            if (len(course) == 1):
                exam = Exam(name=name, course=course.first(), start_time=start_time, end_time=end_time, submit_duration=submit_duration, total_marks=total_marks, completed=False)
                exam.save()

                return CreateExam(exam=exam, success=True)

            raise Exception("Course not found!")

        raise Exception("You must be logged in!")




class Query(graphene.ObjectType):

    exams_by_course = graphene.List(ExamType, id=graphene.ID())

    logs_by_exam = graphene.List(StudentLogType, id=graphene.ID())



    def resolve_exams_by_course(self, info, id):
        user = info.context.user
        
        if (user.is_authenticated):
            return Exam.objects.raw("SELECT * FROM exams_exam LEFT JOIN courses_courseuser ON\
                                    (exams_exam.course_id = courses_courseuser.course_id) LEFT JOIN users_user ON\
                                    (courses_courseuser.user_id = users_user.id) WHERE users_user.id = %s AND exams_exam.course_id=%s",
                                    [user.id, id])


        else:
            raise Exception("You must be logged in!")


    def resolve_logs_by_exam(self, info, id):
        user = info.context.user

        if (user.is_authenticated):
            return StudentLog.objects.filter(exam__id=id, exam__course__primary_teacher = user)
        
        raise Exception('You must be logged in!')


class Mutation(graphene.ObjectType):
    create_exam = CreateExam.Field()

