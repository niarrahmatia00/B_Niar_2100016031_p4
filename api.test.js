// test/api.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // Pastikan jalur ini benar

describe('API Testing', () => {
  it('should return all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('should create a new item', (done) => {
    const newItem = { name: 'Item 3' };
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  // Test untuk menghapus item
  it('should delete an item', (done) => {
    // Pertama, buat item baru untuk dihapus
    request(app)
      .post('/api/items')
      .send({ name: 'Item to delete' })
      .end((err, res) => {
        const itemId = res.body.id; // Ambil ID item yang baru dibuat

        // Sekarang, coba hapus item yang baru saja dibuat
        request(app)
          .delete(`/api/items/${itemId}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Item deleted successfully');
            
            // Selanjutnya, pastikan item sudah terhapus
            request(app)
              .get('/api/items')
              .end((err, res) => {
                expect(res.body).to.not.deep.include({ id: itemId, name: 'Item to delete' });
                done();
              });
          });
      });
  });

   // Test untuk memperbarui item
   it('should update an item', (done) => {
    // Pertama, buat item baru untuk diperbarui
    request(app)
      .post('/api/items')
      .send({ name: 'Item to update' })
      .end((err, res) => {
        const itemId = res.body.id; // Ambil ID item yang baru dibuat
        const updatedItem = { name: 'Updated Item' };

        // Sekarang, coba perbarui item yang baru saja dibuat
        request(app)
          .put(`/api/items/${itemId}`)
          .send(updatedItem)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', itemId);
            expect(res.body).to.have.property('name', 'Updated Item');

            // Pastikan item diperbarui dengan benar
            request(app)
              .get('/api/items')
              .end((err, res) => {
                expect(res.body).to.deep.include({ id: itemId, name: 'Updated Item' });
                done();
              });
          });
      });
  });
  // Test untuk login
it('should login successfully with valid credentials', (done) => {
    const credentials = { username: 'user', password: 'password' };
    request(app)
        .post('/api/login')
        .send(credentials)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Login successful');
            done();
        });
});

it('should fail to login with invalid credentials', (done) => {
    const credentials = { username: 'user', password: 'wrongpassword' };
    request(app)
        .post('/api/login')
        .send(credentials)
        .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message', 'Invalid credentials');
            done();
        });
});
});
