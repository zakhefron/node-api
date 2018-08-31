export class UserController {
  /**
   * Get user from jwt.
   *
   * @param {object} req
   * @param {object} res
   */
  me(req, res) {}

  /**
   * Login user by generating a new jwt token.
   *
   * @param {object} req
   * @param {object} res
   */
  login(req, res) {}

  /**
   * Register and login user by generating a new jwt token.
   *
   * @param {object} req
   * @param {object} res
   */
  register(req, res) {}

  /**
   * Display a listing of the resource.
   *
   * @param {object} req
   * @param {object} res
   */
  loadAll(req, res) {}

  /**
   * Load a resource by its id.
   *
   * @param {object} req
   * @param {object} res
   */
  loadById(req, res) {}

  /**
   * Return the total amount of a specific resource.
   *
   * @param {object} req
   * @param {object} res
   */
  count(req, res) {}

  /**
   * Update the specified resource in storage.
   *
   * @param {object} req
   * @param {object} res
   */
  update(req, res) {}

  /**
   * Remove the specified resource from storage.
   *
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) {}
}
