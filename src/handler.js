// install dan pasang nanoid untuk primary key dari note kita
const { nanoid } = require("nanoid");
// panggil modul notes
const notes = require('./notes');

// # CRUD Handler

// Create Handler
const addNoteHandler = (req, h) => {
    // ambil data body menggunakan req.payload (Khusus Hapi)
    // kita ambil title, tags, body karena sesuai dari dicoding
    const { title, tags, body } = req.payload;

    // bikin primary key menggunakan nano id @param <number> merupakan jumlah string yg didapatkan
    const id = nanoid(16);
    // created at tinggal bikin pakai date
    const createdAt = new Date().toISOString();
    // updated at ambil aja dari created at
    const updatedAt = createdAt;

    // kumpulkan isi data newNote utk di push
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    // push data note
    notes.push(newNote);

    // logika bila sukses maka kembalikan success
    const isSuccess = notes.filter((note) => note.id === id).length > 0;;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    };

    // bila gagal
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getAllNotesHandler = (req, h) => ({
    status: 'success',
    data : {
        notes,
    },
});

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    // const note = notes.filter((n) => n.id === id)[0];

    const note = notes.filter((n) => {
        return n.id === id
    })[0];

    if (note !== undefined) {
        return {
            message: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const { title, tags, body } = req.payload;

    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan, id gagal ditermukan',
    });

    response.code(404);
    return response;

};

const deleteNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.id === id);
    const username = notes[index].title;

    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: `Catatan dengan username : ${username} telah berhasil dihapus`
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: `index catatan tidak ditemukan`
    });
    response.code(404);
    return response;

}


module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
    
};