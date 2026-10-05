// Real output of the Random Forest in CreditCardFraudDetection_ML, scored on its
// held-out test set (56,962 transactions, 98 fraud). A 100-tree forest can only
// emit scores k/100, so index k holds how many transactions scored exactly k/100.
// Regenerate with model.predict_proba(X_test)[:, 1] if the model is retrained.
export const legitByScore = [
  55665, 928, 143, 50, 13, 17, 9, 5, 3, 4, 0, 3, 2, 4, 0, 0, 0, 1, 2, 2, 2, 1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
]

export const fraudByScore = [
  8, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 2, 1, 1,
  0, 2, 0, 1, 0, 2, 0, 2, 2, 1, 2, 3, 0, 1, 6, 3, 3, 1, 2, 6, 4, 4, 4, 5, 9,
]

export const fraudModel = {
  name: 'Random Forest · 100 trees · balanced class weights',
  prAuc: 0.849,
  rocAuc: 0.958,
  repo: 'https://github.com/AmanShrestha-01/CreditCardFraudDetection_ML',
}
