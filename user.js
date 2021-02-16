export const fix_user = (user) => {
    let Man = 'Man';
    let Woman = 'Woman';

    user.Gender ? user.Gender = Man : user.Gender = Woman
    user.Interested ? user.Interested = Man : user.Interested = Woman

    return user;
}