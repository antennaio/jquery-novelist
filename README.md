jQuery Novelist Plugin
======================

Limit user input in textareas or text fields.

How to use
----------

Examples of use are here:

[http://antenna.io/demo/jquery-novelist/examples/](http://antenna.io/demo/jquery-novelist/examples/)

How to run tests
----------------

```
git clone https://github.com/antennaio/jquery-novelist
cd jquery-novelist
npm install
./node_modules/mocha/bin/mocha -R spec

  novelist plugin on init with custom options
    ✓ should update defaults

  novelist plugin on show
    ✓ should have data
    ✓ should be able to read character limit from data attribute
    ✓ should reposition background

  novelist plugin on show with some input
    ✓ should reposition background
    ✓ should pass correct values to a callback

  novelist plugin on show with too much input
    ✓ should truncate text
    ✓ should reposition background
    ✓ should pass correct values to a callback


  ✔ 9 tests complete (117 ms)

```

License
-------

Dual licensed under the MIT and GPL licenses:<br />
[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)<br />
[http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)