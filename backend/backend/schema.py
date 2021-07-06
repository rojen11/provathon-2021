import graphene

# Authentication Schemas
from users.schema import AuthMutation, AuthQuery

class Mutation(AuthMutation, graphene.ObjectType):
   pass

class Query(AuthQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)