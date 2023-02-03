import { Resolver, Query, Mutation, Args<% if (numericId) { %>, Int<% } %> } from '@nestjs/graphql';

import {
  <%= namePascalSingle %>,
  <%= namePascalSingle %>CreateInput,
  <%= namePascalSingle %>UpdateInput,
} from '@<%= npmScope %>/<%= project %>/<%= dbTypesDirectory %>';

import { <%= namePascal %>Service } from './<%= name %>.service';

@Resolver(() => <%= namePascalSingle %>)
export class <%= namePascal %>Resolver {
  constructor(private readonly <%= nameCamelSingle %>Service: <%= namePascal %>Service) {}

  @Mutation(() => <%= namePascalSingle %>)
  create<%= namePascalSingle %>(@Args('<%= nameCamelSingle %>CreateInput') <%= nameCamelSingle %>CreateInput: <%= namePascalSingle %>CreateInput) {
    return this.<%= nameCamelSingle %>Service.create(<%= nameCamelSingle %>CreateInput);
  }

  @Query(() => [<%= namePascalSingle %>], { name: '<%= nameCamel %>' })
  findAll() {
    return this.<%= nameCamelSingle %>Service.findAll();
  }

  @Query(() => <%= namePascalSingle %>, { name: '<%= nameCamelSingle %>' })
  findOne(@Args('id'<% if (numericId) { %>, { type: () => Int }<% } %>) id: <% if (numericId) { %>number<% } else { %>string<% } %>) {
    return this.<%= nameCamelSingle %>Service.findOne(id);
  }

  @Mutation(() => <%= namePascalSingle %>)
  update<%= namePascalSingle %>(
    @Args('id'<% if (numericId) { %>, { type: () => Int }<% } %>) id: <% if (numericId) { %>number<% } else { %>string<% } %>,
    @Args('<%= nameCamelSingle %>UpdateInput') <%= nameCamelSingle %>UpdateInput: <%= namePascalSingle %>UpdateInput,
  ) {
    return this.<%= nameCamelSingle %>Service.update(id, <%= nameCamelSingle %>UpdateInput);
  }

  @Mutation(() => <%= namePascalSingle %>)
  remove<%= namePascalSingle %>(@Args('id'<% if (numericId) { %>, { type: () => Int } <% } %>) id: <% if (numericId) { %>number<% } else { %>string<% } %>) {
    return this.<%= nameCamelSingle %>Service.remove(id);
  }
}
