import graphene

from graphene_django import DjangoObjectType

from courses.models import Course, CourseUser
from users.models import User

class CourseType(DjangoObjectType):
    class Meta:
        model = Course

class UserType(DjangoObjectType):
    class Meta:
        model = User


# Mutation to create course
class CreateCourse(graphene.Mutation):

    course = graphene.Field(CourseType)


    class Arguments:
        # The input arguments for this mutation
        name = graphene.String(required=True)
        limit = graphene.Int()


    @classmethod
    def mutate(cls, root, info, name, limit):
        if (info.context.user.is_authenticated):
            teacher = info.context.user

            if (not teacher.isTeacher):
                raise Exception('Only teachers are allowed to create a course!')


            course = Course(name=name, limit=limit, primary_teacher=teacher)
            courseuser = CourseUser(course=course, user=teacher)
            course.save()
            courseuser.save()
            # Notice we return an instance of this mutation
            return CreateCourse(course=course)

        raise Exception('You must be logged in!')


# Mutation to delete a course
class DeleteCourse(graphene.Mutation):    

    # return values
    id = graphene.ID()
    success = graphene.Boolean()

    # model
    course = graphene.Field(CourseType)

    class Arguments:
        # Input arguments for this mutation
        id = graphene.Int(required=True)


    @classmethod
    def mutate(cls, root, info, id):
        if (info.context.user.is_authenticated):
            teacher = info.context.user
            teacher_id = teacher.id

            # check if the user is a teacher
            if (not teacher.isTeacher):
                raise Exception('Only teachers are allowed to delete a course!')

            # check if the course belongs to the teacher
            c = Course.objects.get(id=id)
            if (c.primary_teacher_id == teacher_id):
                c.delete()
                return cls(id, True)

            raise Exception('Course not found!')

        raise Exception('You must be logged in!')


class JoinCourse(graphene.Mutation):
    
    # return values
    success = graphene.Boolean()

    # model  
    course = graphene.Field(CourseType)

    class Arguments:
        # input arguments
        code = graphene.String(required=True)

    
    @classmethod
    def mutate(cls, root, info, code):
        user = info.context.user

        if (user.is_authenticated):
            
            if (user.isTeacher):
                raise Exception('You must be student to join this course!')

            course = Course.objects.get(code=code)

            cu = CourseUser.objects.filter(course=course, user=user)

            if (cu.count() > 0):
                raise Exception('You are already in this course!')

            if (course == None):
                raise Exception('This course doesn\'t exists')


            courseUser = CourseUser(user=user, course=course)
            courseUser.save()

            return cls(success=True, course=course)

        raise Exception('You must be logged in!')



# Query course of the user
class Query(graphene.ObjectType):
    course = graphene.List(CourseType)
    student_by_course = graphene.List(UserType, course_id=graphene.ID())


    def resolve_course(self, info):
        user = info.context.user
        if (user.is_authenticated):
            if (user.isTeacher):
                return Course.objects.filter(primary_teacher = info.context.user)
            else:
                return Course.objects.filter(courseuser__user=user)
        raise Exception("You must be logged in!")

    
    def resolve_student_by_course(self, info, course_id):

        user = info.context.user

        if (user.is_authenticated):
            course = Course.objects.get(id=course_id)
            return User.objects.filter(courseuser__course=course, isTeacher=False).only('id','first_name','last_name','email')

        raise Exception("You must be logged in!")

            



# Mutations
class Mutation(graphene.ObjectType):
    create_course = CreateCourse.Field()
    delete_course = DeleteCourse.Field()
    join_course = JoinCourse.Field()


