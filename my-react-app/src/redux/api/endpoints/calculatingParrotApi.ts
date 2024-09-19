import { calculatingParrotApi as api } from "../apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.userId}` }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userId}`,
        method: "PUT",
        body: queryArg.user,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userId}`,
        method: "DELETE",
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/users/register`,
        method: "POST",
        body: queryArg.userRegistration,
      }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/users/login`,
        method: "POST",
        body: queryArg.userLogin,
      }),
    }),
    getLineItem: build.query<GetLineItemApiResponse, GetLineItemApiArg>({
      query: (queryArg) => ({ url: `/lineitems/${queryArg.lineItemId}` }),
    }),
    updateLineItem: build.mutation<
      UpdateLineItemApiResponse,
      UpdateLineItemApiArg
    >({
      query: (queryArg) => ({
        url: `/lineitems/${queryArg.lineItemId}`,
        method: "PUT",
        body: queryArg.lineItemCreate,
      }),
    }),
    deleteLineItem: build.mutation<
      DeleteLineItemApiResponse,
      DeleteLineItemApiArg
    >({
      query: (queryArg) => ({
        url: `/lineitems/${queryArg.lineItemId}`,
        method: "DELETE",
      }),
    }),
    createLineItem: build.mutation<
      CreateLineItemApiResponse,
      CreateLineItemApiArg
    >({
      query: (queryArg) => ({
        url: `/lineitems/${queryArg.budgetId}`,
        method: "POST",
        body: queryArg.lineItemCreate,
      }),
    }),
    getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>({
      query: () => ({ url: `/categories` }),
    }),
    createCategory: build.mutation<
      CreateCategoryApiResponse,
      CreateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: "POST",
        body: queryArg.categoryNoId,
      }),
    }),
    getCategory: build.query<GetCategoryApiResponse, GetCategoryApiArg>({
      query: (queryArg) => ({ url: `/categories/${queryArg.categoryId}` }),
    }),
    updateCategory: build.mutation<
      UpdateCategoryApiResponse,
      UpdateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}`,
        method: "PUT",
        body: queryArg.category,
      }),
    }),
    deleteCategory: build.mutation<
      DeleteCategoryApiResponse,
      DeleteCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}`,
        method: "DELETE",
      }),
    }),
    getBudgets: build.query<GetBudgetsApiResponse, GetBudgetsApiArg>({
      query: () => ({ url: `/budgets` }),
    }),
    createBudget: build.mutation<CreateBudgetApiResponse, CreateBudgetApiArg>({
      query: (queryArg) => ({
        url: `/budgets`,
        method: "POST",
        body: queryArg.budgetCreate,
      }),
    }),
    getBudget: build.query<GetBudgetApiResponse, GetBudgetApiArg>({
      query: (queryArg) => ({ url: `/budgets/${queryArg.budgetId}` }),
    }),
    updateBudget: build.mutation<UpdateBudgetApiResponse, UpdateBudgetApiArg>({
      query: (queryArg) => ({
        url: `/budgets/${queryArg.budgetId}`,
        method: "PUT",
        body: queryArg.budget,
      }),
    }),
    deleteBudget: build.mutation<DeleteBudgetApiResponse, DeleteBudgetApiArg>({
      query: (queryArg) => ({
        url: `/budgets/${queryArg.budgetId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as calculatingParrotApi };
export type GetUsersApiResponse = /** status 200 Ok */ UsersResponse[];
export type GetUsersApiArg = void;
export type GetUserApiResponse = /** status 200 Ok */ UsersResponse | null;
export type GetUserApiArg = {
  userId: string;
};
export type UpdateUserApiResponse = /** status 200 Ok */ User;
export type UpdateUserApiArg = {
  userId: string;
  user: User;
};
export type DeleteUserApiResponse = /** status 200 Ok */ User;
export type DeleteUserApiArg = {
  userId: string;
};
export type CreateUserApiResponse = /** status 200 Ok */ User;
export type CreateUserApiArg = {
  userRegistration: UserRegistration;
};
export type LoginApiResponse = /** status 200 Ok */ UserLoginResponse;
export type LoginApiArg = {
  userLogin: UserLogin;
};
export type GetLineItemApiResponse =
  /** status 200 Ok */ LineItemWithCategory | null;
export type GetLineItemApiArg = {
  lineItemId: string;
};
export type UpdateLineItemApiResponse =
  /** status 200 Ok */ LineItemWithCategory;
export type UpdateLineItemApiArg = {
  lineItemId: string;
  lineItemCreate: LineItemCreate;
};
export type DeleteLineItemApiResponse = /** status 200 Ok */ LineItem;
export type DeleteLineItemApiArg = {
  lineItemId: string;
};
export type CreateLineItemApiResponse = /** status 200 Ok */ LineItemCreate;
export type CreateLineItemApiArg = {
  budgetId: string;
  lineItemCreate: LineItemCreate;
};
export type GetCategoriesApiResponse = /** status 200 Ok */ Category[];
export type GetCategoriesApiArg = void;
export type CreateCategoryApiResponse = /** status 200 Ok */ Category;
export type CreateCategoryApiArg = {
  categoryNoId: CategoryNoId;
};
export type GetCategoryApiResponse = /** status 200 Ok */ Category | null;
export type GetCategoryApiArg = {
  categoryId: string;
};
export type UpdateCategoryApiResponse = /** status 200 Ok */ Category;
export type UpdateCategoryApiArg = {
  categoryId: string;
  category: Category;
};
export type DeleteCategoryApiResponse = /** status 200 Ok */ Category;
export type DeleteCategoryApiArg = {
  categoryId: string;
};
export type GetBudgetsApiResponse = /** status 200 Ok */ Budget[];
export type GetBudgetsApiArg = void;
export type CreateBudgetApiResponse = /** status 200 Ok */ BudgetResponse;
export type CreateBudgetApiArg = {
  budgetCreate: BudgetCreate;
};
export type GetBudgetApiResponse = /** status 200 Ok */ BudgetResponse | null;
export type GetBudgetApiArg = {
  budgetId: string;
};
export type UpdateBudgetApiResponse = /** status 200 Ok */ Budget;
export type UpdateBudgetApiArg = {
  budgetId: string;
  budget: Budget;
};
export type DeleteBudgetApiResponse = /** status 200 Ok */ Budget;
export type DeleteBudgetApiArg = {
  budgetId: string;
};
export type UsersResponse = {
  isVerified: boolean;
  email: string;
  name: string;
};
export type DefaultSelectionPrisma36UserPayload = {
  updatedOn: string;
  createdOn: string;
  isVerified: boolean;
  password: string;
  name: string;
  email: string;
  id: string;
};
export type User = DefaultSelectionPrisma36UserPayload;
export type UserRegistration = {
  password: string;
  email: string;
  name: string;
};
export type UserLoginResponse = {
  token: string;
};
export type UserLogin = {
  password: string;
  email: string;
};
export type $36EnumsRecurrence =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | "ONCE";
export type $36EnumsCurrency = "USD" | "EUR" | "DKK";
export type CategoryNoId = {
  colorHex: string;
  description: string;
  name: string;
};
export type LineItemWithCategory = {
  id: string;
  recurrence: $36EnumsRecurrence;
  currency: $36EnumsCurrency;
  amount: number;
  name: string;
  category: CategoryNoId;
  categoryId: string;
};
export type LineItemCreate = {
  name: string;
  amount: number;
  currency: $36EnumsCurrency;
  recurrence?: $36EnumsRecurrence;
  categoryId: string;
};
export type DefaultSelectionPrisma36LineItemPayload = {
  updatedOn: string;
  createdOn: string;
  budgetId: string;
  categoryId: string;
  recurrence: $36EnumsRecurrence;
  currency: $36EnumsCurrency;
  amount: number;
  name: string;
  id: string;
};
export type LineItem = DefaultSelectionPrisma36LineItemPayload;
export type DefaultSelectionPrisma36CategoryPayload = {
  updatedOn: string;
  createdOn: string;
  colorHex: string;
  description: string;
  name: string;
  id: string;
};
export type Category = DefaultSelectionPrisma36CategoryPayload;
export type DefaultSelectionPrisma36BudgetPayload = {
  updatedOn: string;
  createdOn: string;
  userId: string;
  savings: number;
  startingCapital: number;
  name: string;
  id: string;
};
export type Budget = DefaultSelectionPrisma36BudgetPayload;
export type BudgetWithLineItems = {
  id: string;
  name: string;
  startingCapital: number;
  savings: number;
  userId: string;
  lineItems: LineItemWithCategory[];
};
export type BudgetResponse = BudgetWithLineItems | null;
export type BudgetCreate = {
  name: string;
  startingCapital: number;
};
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLoginMutation,
  useGetLineItemQuery,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
  useCreateLineItemMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetBudgetsQuery,
  useCreateBudgetMutation,
  useGetBudgetQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = injectedRtkApi;
