export class TagController {
  /**
   * Display a listing of the resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<T | never>}
   */
  loadAll(req, res) {}

  /**
   * Load a resource by its id.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  loadById(req, res) {}

  /**
   * Return the total amount of a specific resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  count(req, res) {}

  /**
   * Update the specified resource in storage.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  update(req, res) {}

  /**
   * Remove the specified resource from storage.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  destroy(req, res) {}
}
