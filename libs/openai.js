function pca(data) {
    // Center the data by subtracting the mean of each feature
    let centeredData = data.map(row => row.map((val, i) => val - data.mean(x => x[i])));
  
    // Calculate the covariance matrix
    let cov = covariance(centeredData);
  
    // Find the eigenvalues and eigenvectors of the covariance matrix
    let eigen = eigen(cov);
  
    // Sort the eigenvalues and eigenvectors in descending order by eigenvalue
    eigen.values.zip(eigen.vectors).sort((a, b) => b[0] - a[0]);
  
    // Return the sorted eigenvectors (the principal components)
    return eigen.vectors;
  }
  
  // Function to calculate the sample covariance matrix of a matrix
  function covariance(matrix) {
    // Calculate the mean of each column
    let means = matrix.reduce((acc, row) => {
      row.forEach((val, i) => acc[i] += val);
      return acc;
    }, Array(matrix[0].length).fill(0)).map(val => val / matrix.length);
  
    // Calculate the covariance matrix
    let cov = matrix.map(row => row.map((val, i) => (val - means[i]) ** 2));
    return cov.reduce((acc, row) => {
      row.forEach((val, i) => acc[i][i] += val);
      return acc;
    }, Array(matrix[0].length).fill().map(() => Array(matrix[0].length).fill(0)))
      .map(row => row.map(val => val / (matrix.length - 1)));
  }
  
  // Function to find the eigenvalues and eigenvectors of a matrix using the power iteration method
  function eigen(matrix) {
    // Initialize an array of eigenvectors with random values
    let eigenvectors = Array(matrix.length).fill().map(() => Array(matrix.length).fill(Math.random()));
  
    // Iterate until convergence
    let error = Infinity;
    while (error > 1e-6) {
      // Calculate the new eigenvectors
      let newEigenvectors = matrix.dot(eigenvectors);
  
      // Normalize the new eigenvectors
      let norms = newEigenvectors.map(arr => arr.norm());
      newEigenvectors = newEigenvectors.map((arr, i) => arr.map(val => val / norms[i]));
  
      // Calculate the error
      error = newEigenvectors.map((arr, i) => arr.sub(eigenvectors[i]).norm()).max();
  
      // Update the eigenvectors
      eigenvectors = newEigenvectors;
    }
  
    // Calculate the eigenvalues as the dot product of the matrix and the eigenvectors
    let eigenvalues = eigenvectors.map(vec => matrix.dot(vec)[0]);
  
    return {
        values: eigenvalues,
        vectors: eigenvectors
      };
}

function sub(arr1, arr2) {
    return arr1.map((val, i) => val - arr2[i]);
  }
  
  function norm(arr) {
    return Math.sqrt(dot(arr, arr));
  }
  function mean(arr) {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
  }
  function dot(arr1, arr2) {
    return arr1.reduce((acc, val, i) => acc + val * arr2[i], 0);
  }
  
      