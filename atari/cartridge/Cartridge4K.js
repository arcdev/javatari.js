/**
 * Created by ppeccin on 20/11/2014.
 */

function Cartridge4K(rom, format) {

    function init() {
        // Always use a 4K ROM image, multiplying the ROM internally
        bytes = new Array(SIZE);
        var len = rom.content.length;
        for (var pos = 0; pos < bytes.length; pos += len)
            Util.arrayCopy(rom.content, 0, bytes, pos, len);
    }

    this.read = function(address) {
        return bytes[address & ADDRESS_MASK];
    };

    this.write = function(address, val) {
        console.log("Trying to write into cartridge: " + address.toString(16) + "  " + val);
    };


    // Savestate  -------------------------------------------

    this.saveState = function() {
        return {
            format: format.name,
            bytes: bytes
        };
    };

    this.loadState = function(state) {
        bytes = state.bytes;
    };


    this.format = format;

    var bytes;

    var ADDRESS_MASK = 0x0fff;
    var SIZE = 4096;


    if (rom) init();

}

Cartridge4K.prototype = new Cartridge();
